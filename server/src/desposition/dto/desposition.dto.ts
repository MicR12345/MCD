
import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger"

export class DespositionDto {
    @ApiProperty()
    MCD_DYSPOZYCJE_KOSZYK_ID: number;
    @ApiProperty()
    MAGAZYN_DST_ID: number;
    @ApiProperty()
    WYDZIALY_ID: number;
    @ApiProperty()
    SERIA_ID: number;
    @ApiProperty()
    LIMIT_ID: number;
    @ApiProperty()
    PZP_ID: number;
    @ApiProperty()
    ELEMENT_ID: number;
    @ApiProperty()
    ELEMENT_WGR_KOD: string;
    @ApiProperty()
    ILOSC: string;
    @ApiProperty()
    ELEMENT_KOD: string;
    @ApiProperty()
    ELEMENT_NAZWA: string;
    @ApiProperty()
    JEDNOSTKI_KOD: string;
    @ApiProperty()
    ZAZNACZONY: number;
    @ApiProperty()
    SERIA_KOD: string;
    @ApiProperty()
    LIMIT_KOD: string;
    @ApiProperty()
    PZP_KOD: string;
}

export class DespositionResultDto {
    @ApiProperty()
    MCD_DYSPOZYCJE_KOSZYK_ID: number;
    @ApiProperty()
    MAGAZYN_DST_ID: number;
    @ApiProperty()
    WYDZIALY_ID: number;
    @ApiProperty()
    ELEMENT_ID: number;
    @ApiProperty()
    ELEMENT_WGR_KOD: string;
    @ApiProperty()
    ILOSC: string;
    @ApiProperty()
    ELEMENT_KOD: string;
    @ApiProperty()
    ELEMENT_NAZWA: string;
    @ApiProperty()
    JEDNOSTKI_KOD: string;
    @ApiProperty()
    ZAZNACZONY: number
    @ApiProperty()
    KOD: string;
    @ApiProperty()
    RODZAJ: string;
}

export class CreateDespositionDto {
    @ApiProperty()
    KOD_BLEDU: number;
    @ApiProperty()
    ELEMENT_ID: number;
    @ApiProperty()
    ILOSC_ZAMOWIONA: number;
    @ApiProperty()
    MCD_DYSPOZYCJE_ID: number;
}

export class GetDespositionDto {
    @ApiProperty()
    MCD_DYSPOZYCJE_ID: number;
    @ApiProperty()
    NUMER_DYSPOZYCJI: string;
    @ApiProperty()
    STATUS: number;
    @ApiProperty()
    INS_DATE: string;
    @ApiProperty()
    MAGAZYNY_KOD: string;
    @ApiProperty()
    WYDZIALY_KOD: string;
    @ApiProperty()
    KOD: string;
    @ApiProperty()
    RODZAJ: string;
}


export class GetDespositionSpecDto {
    @ApiProperty()
    ELEMENT_ID: number;
    @ApiProperty()
    ELEMENT_KOD: string;
    @ApiProperty()
    ELEMENT_NAZWA: string;
    @ApiProperty()
    JEDNOSTKI_KOD: string;
    @ApiProperty()
    ILOSC: number;
    @ApiProperty()
    ILOSC_WYD: number;
    @ApiProperty()
    STATUS: string;
}