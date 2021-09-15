import { FirebirdService } from '@itm/firebird-interface';
import { HttpException } from '@nestjs/common';
import { Injectable, InternalServerErrorException, Logger, MethodNotAllowedException } from '@nestjs/common';
import { IRequestJwt } from 'src/authentication/interfaces/request.interface';
import { CreateDespositionDto, DespositionDto, DespositionResultDto, GetDespositionDto, GetDespositionSpecDto } from './dto/desposition.dto';
import { GetDespositionInterface } from './dto/desposition.interface';
import { CartUpdateParams, DespositionParams } from './dto/desposition.params.dto';
import * as moment from 'moment';

@Injectable()
export class DespositionService {
    constructor(
        private readonly fb: FirebirdService
    ) { }

    public async Get(req: IRequestJwt): Promise<GetDespositionDto[]> {
        let result: GetDespositionDto[] = [];
        const query = `
        select 
            MCD_DYSPOZYCJE.MCD_DYSPOZYCJE_ID,
            MCD_DYSPOZYCJE.NUMER_DYSPOZYCJI,
            MCD_DYSPOZYCJE.STATUS,
            MCD_DYSPOZYCJE.INS_DATE,
            MCD_DYSPOZYCJE.SERIA_ID,
            MCD_DYSPOZYCJE.LIMIT_ID,
            MCD_DYSPOZYCJE.PZP_ID,
            MCD_DYSPOZYCJE.MAGAZYN_DST_ID,
            trim(MAGAZYNY.MAGAZYNY_KOD) as MAGAZYNY_KOD,
            MCD_DYSPOZYCJE.WYDZIALY_ID,
            trim(LC_WYDZIALY.LC_WYDZIALY_KOD) as WYDZIALY_KOD,
            trim(SERIA.SERIA_KOD) as SERIA_KOD,
            trim(LIMIT.LIMIT_KOD) as LIMIT_KOD,
            trim(PRZEGZLECPROD.NR_ZLECENIA) as PZP_KOD
        from MCD_DYSPOZYCJE
            left join SERIA on SERIA.SERIA_ID = MCD_DYSPOZYCJE.SERIA_ID
            left join LIMIT on LIMIT.LIMIT_ID = MCD_DYSPOZYCJE.LIMIT_ID
            left join PRZEGZLECPROD on PRZEGZLECPROD.PRZEGZLECPROD_ID = MCD_DYSPOZYCJE.PZP_ID
            inner join MAGAZYNY on MAGAZYNY.MAGAZYNY_ID = MCD_DYSPOZYCJE.MAGAZYN_DST_ID
            inner join LC_WYDZIALY on LC_WYDZIALY.LC_WYDZIALY_ID = MCD_DYSPOZYCJE.WYDZIALY_ID
        where 
            MCD_DYSPOZYCJE.PRACOWNICY_ID = ? 
            `

        const data = await this.fb.Query<GetDespositionInterface>(query, [req.user.PRACOWNICY_ID]);

        for (let items of data) {
            let rodzaj: string = null;
            let kod: string = null;

            if (items.SERIA_ID) {
                rodzaj = 'Seria';
                kod = items.SERIA_KOD;
            }
            if (items.LIMIT_ID) {
                rodzaj = 'Limit';
                kod = items.LIMIT_KOD;
            }
            if (items.PZP_ID) {
                rodzaj = 'Zlec. prod.';
                kod = items.PZP_KOD;
            }

            result.push({
                MCD_DYSPOZYCJE_ID: items.MCD_DYSPOZYCJE_ID,
                NUMER_DYSPOZYCJI: items.NUMER_DYSPOZYCJI == undefined ? 'Brak' : items.NUMER_DYSPOZYCJI,
                WYDZIALY_KOD: items.WYDZIALY_KOD,
                MAGAZYNY_KOD: items.MAGAZYNY_KOD,
                STATUS: items.STATUS,
                RODZAJ: rodzaj,
                KOD: kod,
                INS_DATE: moment(new Date(items.INS_DATE)).format('DD-MM-YYYY HH:mm')
            })
        }
        return result;
    }

    public async GetSpec(id: number): Promise<GetDespositionSpecDto[]> {
        const query = `
        select 
            MCD_DYSPOZYCJE_SPEC.ELEMENT_ID,
            trim(ARTYKUL.ARTYKUL_KOD) as ELEMENT_KOD,
            trim(ARTYKUL.NAZWA1) as ELEMENT_NAZWA,
            trim(JEDNOSTKI.JEDNOSTKI_KOD) as JEDNOSTKI_KOD,
            MCD_DYSPOZYCJE_SPEC.ILOSC,
            MCD_DYSPOZYCJE_SPEC.ILOSC_WYD,
            MCD_DYSPOZYCJE_SPEC.STATUS
        from MCD_DYSPOZYCJE_SPEC
            inner join ARTYKUL on ARTYKUL.ARTYKUL_ID = MCD_DYSPOZYCJE_SPEC.ELEMENT_ID
            inner join JEDNOSTKI on JEDNOSTKI.JEDNOSTKI_ID = ARTYKUL.JEDNOSTKI_ID
        where
            MCD_DYSPOZYCJE_SPEC.MCD_DYSPOZYCJE_ID = ?
        `
        return await this.fb.Query<GetDespositionSpecDto>(query, [id]);
    }

    public async CartCount(req: IRequestJwt): Promise<number> {
        try {
            const query = `
                select count(*)
                    from MCD_DYSPOZYCJE_KOSZYK
                where MCD_DYSPOZYCJE_KOSZYK.PRACOWNICY_ID = ?
            `
            const data = await this.fb.Query<{ COUNT: number }>(query, [req.user.PRACOWNICY_ID]);
            return data[0].COUNT;
        } catch (error) {
            Logger.error(`Cannot count cart. PRACOWNICY_ID: ${req.user.PRACOWNICY_ID}`);
            throw new InternalServerErrorException(error.message)
        }
    }

    public async CartGet(req: IRequestJwt): Promise<DespositionResultDto[]> {
        let result: DespositionResultDto[] = [];
        try {
            const query = `
            select MCD_DYSPOZYCJE_KOSZYK.MCD_DYSPOZYCJE_KOSZYK_ID,
                MCD_DYSPOZYCJE_KOSZYK.MAGAZYN_DST_ID,
                MCD_DYSPOZYCJE_KOSZYK.WYDZIALY_ID,
                MCD_DYSPOZYCJE_KOSZYK.SERIA_ID,
                MCD_DYSPOZYCJE_KOSZYK.LIMIT_ID,
                MCD_DYSPOZYCJE_KOSZYK.PZP_ID,
                MCD_DYSPOZYCJE_KOSZYK.ELEMENT_ID,
                MCD_DYSPOZYCJE_KOSZYK.ELEMENT_WGR_KOD,
                MCD_DYSPOZYCJE_KOSZYK.ILOSC,
                trim(ARTYKUL.ARTYKUL_KOD) as ELEMENT_KOD,
                trim(ARTYKUL.NAZWA1) as ELEMENT_NAZWA,
                trim(JEDNOSTKI.JEDNOSTKI_KOD) as JEDNOSTKI_KOD,
                trim(SERIA.SERIA_KOD) as SERIA_KOD,
                trim(LIMIT.LIMIT_KOD) as LIMIT_KOD,
                trim(PRZEGZLECPROD.NR_ZLECENIA) as PZP_KOD,
                MCD_DYSPOZYCJE_KOSZYK.ZAZNACZONY
            from MCD_DYSPOZYCJE_KOSZYK
                left join ARTYKUL on ARTYKUL.ARTYKUL_ID = MCD_DYSPOZYCJE_KOSZYK.ELEMENT_ID
                left join JEDNOSTKI on JEDNOSTKI.JEDNOSTKI_ID = MCD_DYSPOZYCJE_KOSZYK.ELEMENT_ID
                left join SERIA on SERIA.SERIA_ID = MCD_DYSPOZYCJE_KOSZYK.SERIA_ID
                left join LIMIT on LIMIT.LIMIT_ID = MCD_DYSPOZYCJE_KOSZYK.LIMIT_ID
                left join PRZEGZLECPROD on PRZEGZLECPROD.PRZEGZLECPROD_ID = MCD_DYSPOZYCJE_KOSZYK.PZP_ID
            where MCD_DYSPOZYCJE_KOSZYK.PRACOWNICY_ID = ?
            `
            let data = await this.fb.Query<DespositionDto>(query, [req.user.PRACOWNICY_ID]);
            for (let items of data) {
                let rodzaj: string = null;
                let kod: string = null;

                if (items.SERIA_ID) {
                    rodzaj = 'Seria';
                    kod = items.SERIA_KOD;
                }
                if (items.LIMIT_ID) {
                    rodzaj = 'Limit';
                    kod = items.LIMIT_KOD;
                }
                if (items.PZP_ID) {
                    rodzaj = 'Zlec. prod.';
                    kod = items.PZP_KOD;
                }

                result.push({
                    MCD_DYSPOZYCJE_KOSZYK_ID: items.MCD_DYSPOZYCJE_KOSZYK_ID,
                    ELEMENT_ID: items.ELEMENT_ID,
                    ELEMENT_KOD: items.ELEMENT_KOD,
                    ELEMENT_NAZWA: items.ELEMENT_NAZWA,
                    ELEMENT_WGR_KOD: items.ELEMENT_WGR_KOD,
                    ILOSC: parseFloat(items.ILOSC).toFixed(3),
                    JEDNOSTKI_KOD: items.JEDNOSTKI_KOD,
                    MAGAZYN_DST_ID: items.MAGAZYN_DST_ID,
                    WYDZIALY_ID: items.WYDZIALY_ID,
                    ZAZNACZONY: items.ZAZNACZONY,
                    RODZAJ: rodzaj,
                    KOD: kod
                });
            }
            return result;
        } catch (error) {
            Logger.error(`Cannot get cart info. PRACOWNICY_ID: ${req.user.PRACOWNICY_ID}`);
            throw new InternalServerErrorException(error.message)
        }
    }

    public async CartSave(req: IRequestJwt, params: DespositionParams[]): Promise<string> {
        try {
            await this.fb.Transaction(async t => {
                for (let param of params) {
                    const query = `
                    insert into MCD_DYSPOZYCJE_KOSZYK (
                        MCD_DYSPOZYCJE_KOSZYK.LOGIN,
                        MCD_DYSPOZYCJE_KOSZYK.PRACOWNICY_ID,
                        MCD_DYSPOZYCJE_KOSZYK.MAGAZYN_DST_ID,
                        MCD_DYSPOZYCJE_KOSZYK.WYDZIALY_ID,
                        MCD_DYSPOZYCJE_KOSZYK.SERIA_ID,
                        MCD_DYSPOZYCJE_KOSZYK.LIMIT_ID,
                        MCD_DYSPOZYCJE_KOSZYK.PZP_ID,
                        MCD_DYSPOZYCJE_KOSZYK.ELEMENT_ID,
                        MCD_DYSPOZYCJE_KOSZYK.ELEMENT_WGR_KOD,
                        MCD_DYSPOZYCJE_KOSZYK.ILOSC,
                        MCD_DYSPOZYCJE_KOSZYK.ZAZNACZONY) values (
                            '${req.user.LOGIN}', 
                            ${req.user.PRACOWNICY_ID}, 
                            ${param.MAGAZYNY_ID}, 
                            ${param.WYDZIALY_ID}, 
                            ${param.RODZAJ == 1 ? param.ID : null}, 
                            ${param.RODZAJ == 2 ? param.ID : null}, 
                            ${param.RODZAJ == 3 ? param.ID : null}, 
                            ${param.ELEMENT_ID},
                            '${param.ELEMENT_WGR_KOD}', 
                            ${param.ILOSC},
                            1)
                    `
                    await this.fb.Query(query, [], t);
                }
            })
            return 'Save cart success.'
        } catch (error) {
            Logger.error(`Cannot save cart. Params: ${params}`);
            throw new InternalServerErrorException(error.message)
        }
    }

    public async CartUpdate(req: IRequestJwt, params: CartUpdateParams): Promise<string> {
        try {
            const query = `
                update MCD_DYSPOZYCJE_KOSZYK
                    set 
                        MCD_DYSPOZYCJE_KOSZYK.ILOSC = ?, 
                        MCD_DYSPOZYCJE_KOSZYK.ZAZNACZONY = ?
                where MCD_DYSPOZYCJE_KOSZYK.MCD_DYSPOZYCJE_KOSZYK_ID = ?  
            `
            await this.fb.Query(query, [params.ILOSC, params.ZAZNACZONY == true ? 1 : 0, params.MCD_DYSPOZYCJE_KOSZYK_ID])
            return 'Update cart success.'
        } catch (error) {
            Logger.error(`Cannot update quantity in cart. PRACOWNICY_ID: ${req.user.PRACOWNICY_ID}, MCD_DYSPOZYCJE_KOSZYK_ID: ${params.MCD_DYSPOZYCJE_KOSZYK_ID}, ILOSC: ${params.ILOSC}, ZAZNACZONY: ${params.ZAZNACZONY}.`);
            throw new InternalServerErrorException(error.message)
        }
    }

    public async CartDelete(id: number): Promise<string> {
        try {
            const query = `
                delete from MCD_DYSPOZYCJE_KOSZYK
                    where MCD_DYSPOZYCJE_KOSZYK.MCD_DYSPOZYCJE_KOSZYK_ID = ?
            `
            await this.fb.Query(query, [id]);
            return 'Deleted';
        } catch (error) {
            Logger.error(`Cannot delete cart item. MCD_DYSPOZYCJE_KOSZYK_ID: ${id}`);
            throw new InternalServerErrorException(error.message)
        }
    }

    public async CreateDesposition(req: IRequestJwt, params: DespositionParams[]) {
        try {
            return await this.fb.Transaction(async t => {
                //Wygenerowanie sesja ID
                const queryGenSesjaId = `
                    select GEN_ID (GEN_MCD_DYSPOZYCJA_SESJA_ID, 1) from RDB$DATABASE 
                `
                const dataGenId = await this.fb.Query<{ GEN_ID: number }>(queryGenSesjaId, [], t);
                const genId = dataGenId[0].GEN_ID;

                for (let items of params) {
                    const query = `
                    select * from MCD_INSERT_DYSPOZYCJE(
                        ${genId},
                        ${req.user.PRACOWNICY_ID}, 
                        ${items.MAGAZYNY_ID}, 
                        ${items.WYDZIALY_ID}, 
                        ${items.RODZAJ == 1 ? items.ID : null}, 
                        ${items.RODZAJ == 2 ? items.ID : null}, 
                        ${items.RODZAJ == 3 ? items.ID : null},
                        ${items.ELEMENT_ID}, 
                        '${items.ELEMENT_WGR_KOD}', 
                        ${items.ILOSC})  
                    `;
                    const data = await this.fb.Query<CreateDespositionDto>(query, [], t);
                    if (data[0].KOD_BLEDU < 0) {
                        Logger.error(data[0]);
                        throw new MethodNotAllowedException(data[0]);
                    }
                }
                return 'Success.'
            });
        } catch (error) {
            Logger.error(`Create desposition error: ${error.message}`);
            if (error.status) {
                throw new HttpException({
                    status: error.status,
                    error: error.message,
                }, error.status);
            } else {
                throw new InternalServerErrorException(error.message)
            }
        }
    }

    public async CartCreateDesposition(list: number[]) {
        try {
            return await this.fb.Transaction(async t => {
                //Wygenerowanie sesja ID
                const queryGenSesjaId = `select GEN_ID (GEN_MCD_DYSPOZYCJA_SESJA_ID, 1) from RDB$DATABASE`
                const dataGenId = await this.fb.Query<{ GEN_ID: number }>(queryGenSesjaId, [], t);
                const genId = dataGenId[0].GEN_ID;
                const query = `select * from MCD_INSERT_DYSPOZYCJI_Z_KOSZYKA(?, ?)`;

                for (let MCD_DYSPOZYCJE_KOSZYK_ID of list) {
                    const data = await this.fb.Query<CreateDespositionDto>(query, [genId, MCD_DYSPOZYCJE_KOSZYK_ID], t);
                    if (data[0].KOD_BLEDU < 0) {
                        Logger.error(data[0]);
                        throw new MethodNotAllowedException(data[0]);
                    }
                }
            });
        } catch (error) {
            Logger.error(`Cart create desposition error: ${error.message}`);
            if (error.status) {
                throw new HttpException({
                    status: error.status,
                    error: error.message,
                }, error.status);
            } else {
                throw new InternalServerErrorException(error.message)
            }
        }
    }
}
