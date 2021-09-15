import { ApiProperty } from '@nestjs/swagger';

export class WgDto {
    @ApiProperty()
    ARTYKUL_ID: number;
    @ApiProperty()
    ARTYKUL_KOD: string;
    @ApiProperty()
    ARTYKUL_OPIS: string;
    @ApiProperty()
    REALIZACJA: string;
    // @ApiProperty()
    // ILOSC_WYKORZYSTANA: number;
    @ApiProperty()
    ILOSC_MAX: number;
    @ApiProperty()
    IMG: string
    @ApiProperty()
    WGR_KOD: string
    @ApiProperty()
    ATTACHMENT: number
}

export class WgSpecsDto {
    @ApiProperty()
    WYROB_ID: number
    @ApiProperty()
    WYROB_WGR_KOD: string
    @ApiProperty()
    ELEMENT_ID: number
    @ApiProperty()
    ELEMENT_KOD: string
    @ApiProperty()
    ELEMENT_NAZWA: string
    @ApiProperty()
    ELEMENT_WGR_KOD: string
    @ApiProperty()
    JEDNOSTKI_KOD: string
    @ApiProperty()
    ILOSC_JEDNOSTKOWA: number
    @ApiProperty()
    ILOSC_MAX: number
    @ApiProperty()
    WYDZIALY_ID: number
    @ApiProperty()
    WYDZIALY_KOD: string
    @ApiProperty()
    MAGAZYNY_ID: number
    @ApiProperty()
    MAGAZYNY_KOD: string
}

export class WgSpecElementDto {
    @ApiProperty()
    WYROB_ID: number
    @ApiProperty()
    WYROB_WGR_KOD: string
    @ApiProperty()
    ELEMENT_ID: number
    @ApiProperty()
    ELEMENT_KOD: string
    @ApiProperty()
    ELEMENT_NAZWA: string
    @ApiProperty()
    ELEMENT_WGR_KOD: string
    @ApiProperty()
    JEDNOSTKI_KOD: string   
    @ApiProperty()
    ILOSC_JEDNOSTKOWA: number
    @ApiProperty()
    ILOSC_MAX: number
}

export class WgSpecResultDto {
    @ApiProperty({ type: [WgSpecElementDto]})
    elements: WgSpecElementDto[]
    @ApiProperty({ type: [Number] })
    listOfWarehouse: number[]
    @ApiProperty({ type: [Number] })
    departmentList: number[]
}