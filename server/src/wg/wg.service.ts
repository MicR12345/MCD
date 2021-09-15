import { Injectable } from '@nestjs/common';
import { WgParamsDto, WgSpecsParamsDto } from './dto/wg.params.dto';
import { WgDto, WgSpecsDto } from './dto/wg.dto';
import { FirebirdService } from '@itm/firebird-interface';
import { IRequestJwt } from 'src/authentication/interfaces/request.interface';
import { WgSpecElementDto } from './dto/wg.interface'

@Injectable()
export class WgService {
    constructor(
        private readonly fb: FirebirdService
    ) { }

    public async Get(params: WgParamsDto): Promise<WgDto[]> {
        const query = `
        select * from MCD_GET_WG(?, ?)
    `
        let databaseData = await this.fb.Query<WgDto>(query, [params.ID, params.RODZAJ]);

        for (let items of databaseData) {
            items.IMG = items.ATTACHMENT == 1 ? `/api/attachment/get/${items.ARTYKUL_ID}` : null
        }

        return databaseData;
    }

    public async GetSpecs(params: WgSpecsParamsDto) {
        /* ARTYKUL_ID to tak naprawdzę WYROB_ID dla procedury MCD_GET_ELEMENTY_WG */
       /*
                1 element to ARTYKUL_ID,
                2 element to WGR_KOD,
                3 element to ILOSC
        */
        let elementsData: any[] = [];
        let listOfWarehouse: {id: number, kod: string}[] = [];
        let departmentList: {id: number, kod: string}[] = [];

        const query = `
            select * from MCD_GET_ELEMENTY_WG(?, ?)
       `
        let resultData = await this.fb.Query<WgSpecsDto>(query, [params.ID, params.RODZAJ]);
        let itemsCount = params.KOSZYK.split('^');
        if (itemsCount.length == 0) itemsCount[0] = params.KOSZYK;

        for (let filter of itemsCount) {
            let elements: WgSpecElementDto[] = [];

            const element = filter.split('*');
            let data: WgSpecsDto[] = resultData.filter(res => res.WYROB_ID == parseInt(element[0]) && res.WYROB_WGR_KOD == element[1]);
            for (let i of data) {

                const checkWarehouse = listOfWarehouse.some(res => res.id == i.MAGAZYNY_ID)
                if ( checkWarehouse == false ) listOfWarehouse.push({ id: i.MAGAZYNY_ID, kod: i.MAGAZYNY_KOD }); 
                const checkDepartment = departmentList.some(res => res.id == i.WYDZIALY_ID)
                if ( checkDepartment == false ) departmentList.push({ id: i.WYDZIALY_ID, kod: i.WYDZIALY_KOD }); 

                const max = (i.ILOSC_JEDNOSTKOWA * parseInt(element[2])) > i.ILOSC_MAX ? i.ILOSC_MAX : i.ILOSC_JEDNOSTKOWA * parseInt(element[2])
                elements.push({
                    WYROB_ID: parseInt(element[0]),
                    WYROB_WGR_KOD: element[1],
                    ELEMENT_ID: i.ELEMENT_ID,
                    ELEMENT_KOD: i.ELEMENT_KOD,
                    ELEMENT_NAZWA: i.ELEMENT_NAZWA,
                    ELEMENT_WGR_KOD: i.ELEMENT_WGR_KOD.replace(' ', ''),
                    ILOSC_JEDNOSTKOWA: i.ILOSC_JEDNOSTKOWA,
                    ILOSC_MAX: parseFloat(max.toFixed(3)),
                    JEDNOSTKI_KOD: i.JEDNOSTKI_KOD,
                    MAGAZYNY_ID: i.MAGAZYNY_ID,
                    MAGAZYNY_KOD: i.MAGAZYNY_KOD,
                    WYDZIALY_ID: i.WYDZIALY_ID,
                    WYDZIALY_KOD: i.WYDZIALY_KOD
                })
            }
            if (elements.length != 0) {
                elementsData.push(elements)
            }
        }
        return ({
            elementsData,
            departmentList,
            listOfWarehouse
        })
    }
}
