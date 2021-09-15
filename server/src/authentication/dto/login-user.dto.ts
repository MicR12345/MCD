import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description:"Podaj email", example: 'test@itm.com.pl' })
  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @ApiProperty({ description:"Podaj login", example: 'SYSDBA' })
  @IsNotEmpty()
  @MinLength(3)
  login: string;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  imie: string;
  
  @ApiProperty()
  @IsNotEmpty()
  nazwisko: string;

  @ApiProperty()
  @IsNotEmpty()
  magazyn_id: number;
}

export class ChangePasswordDto {
  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}

export class ResetPasswordDto {
  @ApiProperty({ description:"Podaj email", example: 'test@itm.com.pl' })
  @IsNotEmpty()
  @MinLength(4)
  login: string;

  @ApiProperty({ example: 'Hasło admina (goldenowca)' })
  @IsNotEmpty()
  @MinLength(3)
  adminPassword: string;
}

export class LoginDto {
  @ApiProperty({ description:"Podaj email", example: 'test@itm.com.pl' })
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  password: string;
}
