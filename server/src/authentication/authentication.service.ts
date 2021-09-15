import { FirebirdService } from '@itm/firebird-interface';
import { Injectable, UnauthorizedException, MethodNotAllowedException, InternalServerErrorException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponseDto, UserDataDto, AuthDataDto, ResetPasswordResponseDto } from './dto/login-user-response.dto';
import { LoginDto, RegisterDto, ChangePasswordDto, ResetPasswordDto } from './dto/login-user.dto';
import { LogicService } from 'src/logic/logic.service';
import { IRequestJwt } from './interfaces/request.interface';

@Injectable()
export class AuthenticationService {
  public constructor(private config: ConfigService, private jwt: JwtService, private fb: FirebirdService, private logic: LogicService) { }

  public async RegisterWorker(params: RegisterDto) {
    if (await this.CheckUserEmail(params.email)) {
      throw new ForbiddenException('This email already exists.');
    }

    //Sprawdzenie czy magazyn jest zdefiniowany
    const checkWarehouseQuery = `
        SELECT * FROM MAGAZYNY WHERE MAGAZYNY.MAGAZYNY_ID = ?
      `;
    const checkWarehouse = await this.fb.Query(checkWarehouseQuery, [params.magazyn_id]);
    if (checkWarehouse.length == 0) { 
      throw new BadRequestException(`Warehouse not defined, magazyny_id: ${params.magazyn_id}.`) 
    };

    try {
      const queryGenId = `
        select 
          SET_PRACOWNICY_ID.NEW_PRACOWNICY_ID as PRACOWNICY_ID
        from SET_PRACOWNICY_ID
      `;

      const query = `
        insert into PRACOWNICY (
          PRACOWNICY.PRACOWNICY_ID,
          PRACOWNICY.IMIE,
          PRACOWNICY.NAZWISKO,
          PRACOWNICY.E_MAIL,
          PRACOWNICY.LOGIN,
          PRACOWNICY.HASLO,
          PRACOWNICY.AKTYWNY,
          PRACOWNICY.MAGAZYNY_ID,
          PRACOWNICY.PESEL)
        values (?, ?, ?, upper(?), upper(?), ?, 1, ?, ?)
      `;

      await this.fb.Transaction(async t => {
        const pracownicyId = await this.fb.Query<{ PRACOWNICY_ID: number }>(queryGenId, [], t);
        await this.fb.Query(query, [
          pracownicyId[0].PRACOWNICY_ID,
          params.imie,
          params.nazwisko,
          params.email,
          params.login,
          await this.logic.Encrypt(params.password),
          params.magazyn_id,
          this.logic.GenerateRandomBytes(5)], t);
      });
      return "User registered."
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  public async Login(params: LoginDto): Promise<LoginUserResponseDto> {
    //Sprawdzenie poprawności starego hasła
    const loginData = await this.GetUserInfo(params.login, params.password);
    return {
      user: `${loginData[0].IMIE} ${loginData[0].NAZWISKO}`,
      jwt: this.jwt.sign(<UserDataDto>{
        LOGIN: loginData[0].LOGIN,
        E_MAIL: loginData[0].E_MAIL,
        LC_WYDZIALY_ID: loginData[0].LC_WYDZIALY_ID,
        PRACOWNICY_ID: loginData[0].PRACOWNICY_ID,
        MAGAZYNY_ID: loginData[0].MAGAZYNY_ID
      }),
      expiresIn: this.config.get<number>('jwt.signOptions.expiresIn')
    };
  }

  public async ChangePassword(req: IRequestJwt, params: ChangePasswordDto) {
    //Sprawdzenie poprawności starego hasła
    await this.GetUserInfo(req.user.E_MAIL, params.oldPassword);

    const query = `
      update PRACOWNICY set PRACOWNICY.HASLO = ?
      where PRACOWNICY.E_MAIL = upper(?)
    `;

    await this.fb.Transaction(async t => {
      await this.fb.Query(query, [await this.logic.Encrypt(params.newPassword), req.user.LOGIN], t);
    });

    return "Password updated.";
  }

  public async ResetPassword(params: ResetPasswordDto): Promise<ResetPasswordResponseDto> {
    //TODO sprawdzenie hasła administratora
    if (params.adminPassword != "itm") {
      throw new UnauthorizedException("Wrong admin password !!!")
    }

    const login = await this.CheckUserEmail(params.login);

    if (!login) {
      throw new MethodNotAllowedException('User not exists.');
    }

    //Wygenerownaie nowego hasła
    const genNewPassword = this.logic.GenerateRandomBytes(20);

    try {
      const query = `
        update PRACOWNICY set PRACOWNICY.HASLO = ?
        where PRACOWNICY.E_MAIL = upper(?)
      `;

      await this.fb.Transaction(async t => {
        await this.fb.Query(query, [await this.logic.Encrypt(genNewPassword), login], t);
      });

      return {
        Message: "Password has been reset.",
        HASLO: genNewPassword
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  public async CheckUserEmail(login: string): Promise<string> {
    //Sprawdzenie czy string zawiera znak '@'
    await this.logic.CheckEmail(login);

    try {
      const checkQuery = `
        select 
          PRACOWNICY.E_MAIL
        from PRACOWNICY 
          where PRACOWNICY.E_MAIL = upper(?)
      `;

      const result = await this.fb.Query<{ E_MAIL: string }>(checkQuery, [login]);

      if (result.length == 0) {
        return null;
      }

      return result[0].E_MAIL;
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  public async GetUserInfo(email: string, password: string) {
    let loginData: AuthDataDto[] = [];
    //Sprawdzenie czy string zawiera znak '@'
    await this.logic.CheckEmail(email);
    try {
      const query = `
      select 
        PRACOWNICY.PRACOWNICY_ID,
        PRACOWNICY.LOGIN,
        PRACOWNICY.HASLO,
        PRACOWNICY.E_MAIL,
        PRACOWNICY.IMIE,
        PRACOWNICY.NAZWISKO,
        PRACOWNICY_WYDZIAL.LC_WYDZIALY_ID,
        LC_WYDZIALY.LC_WYDZIALY_OPIS,
        PRACOWNICY.MAGAZYNY_ID
      from PRACOWNICY
        left join PRACOWNICY_WYDZIAL on PRACOWNICY_WYDZIAL.PRACOWNICY_ID = PRACOWNICY.PRACOWNICY_ID
        left join LC_WYDZIALY on LC_WYDZIALY.LC_WYDZIALY_ID = PRACOWNICY_WYDZIAL.LC_WYDZIALY_ID
      where PRACOWNICY.E_MAIL = upper(?)  
    `;
      loginData = await this.fb.Query<AuthDataDto>(query, [email]);
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
    if (loginData.length == 0) {
      throw new UnauthorizedException("User not exist.");
    }
    //Porównianie hasła z bazą
    await this.logic.ComparePassword(password, loginData[0].HASLO)
    return loginData;
  }
}
