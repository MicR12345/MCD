import { Injectable } from '@nestjs/common';
import { HeaderParams } from './dto/headers.params.dto';
import { FirebirdService } from '@itm/firebird-interface';
import * as moment from 'moment';
import { HeaderDto } from './dto/headers.dto';
import { IRequestJwt } from 'src/authentication/interfaces/request.interface';

@Injectable()
export class HeadersService {
    constructor(
        private readonly fb: FirebirdService
    ){}

    public async Get(req: IRequestJwt, params: HeaderParams): Promise<HeaderDto[]>{
        const query = `
            select * from MCD_GET_NAGLOWKI(?, ?)
        `
        return await this.fb.Query<HeaderDto>(query, [moment(new Date(params.data)).format('YYYY-MM-DD 00:00:00'), req.user.E_MAIL]);
    }

    public async GetAll(req: IRequestJwt): Promise<HeaderDto[]>{
        const query = `
            select * from MCD_GET_NAGLOWKI(null, ?, 1)
        `
        return await this.fb.Query<HeaderDto>(query, [req.user.E_MAIL]);
    }
}
