import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { FirebirdService } from '@itm/firebird-interface';
import request from 'request';

@Injectable()
export class AttachmentService {
    constructor(
        private readonly fb: FirebirdService
    ) { }

    public async GetImgByHash(id: number, res?: Response) {
            const query = `
                select
                    case(select USTAWIENIA.ID
                        from USTAWIENIA
                        where USTAWIENIA.USTAWIENIA_ID = 2000001)
                    when 1 then ATTACHMENT1
                    when 2 then ATTACHMENT2
                    when 3 then ATTACHMENT3
                    when 4 then ATTACHMENT4
                    when 5 then ATTACHMENT5
                    when 6 then ATTACHMENT6
                    when 7 then ATTACHMENT7
                    when 8 then ATTACHMENT8
                    when 9 then ATTACHMENT9
                    when 10 then ATTACHMENT10
                end
                    from GG_GET_ATT(${id}, 0, (select SETUP.SETUP_VALUE
                                                        from SETUP
                                                            where SETUP.SETUP_ID = 1000014))
                `
            this.fb.DownloadFile(query, [id]).on('response', (res: request.Response) => {
                if (res.statusCode > 201){
                    Logger.warn(`No image on data base for article_id: ${id}. StatusCode: ${res.statusCode}.`);
                } 
            }).pipe(res);
    }
}
