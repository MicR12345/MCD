import { ApiProperty } from "@nestjs/swagger"

export class DespositionParams {
    @ApiProperty()
    //PZP_ID lub LIMIT_ID lub SERIA_ID
    ID: number
    @ApiProperty()
    WYDZIALY_ID: number
    @ApiProperty()
    MAGAZYNY_ID: number
    @ApiProperty()
    ELEMENT_ID: number
    @ApiProperty()
    ELEMENT_WGR_KOD: string
    @ApiProperty()
    ILOSC: string
    @ApiProperty()
    RODZAJ: number;
    @ApiProperty()
    ZAZNACZONY: number;
}

export class ListSaveCartParams {
    @ApiProperty({ type: [DespositionParams] })
    Elements: DespositionParams[]
}

export class CreateDespositionParams {
    @ApiProperty({ type: [Number] })
    Elements: number[]
}

export class CartUpdateParams {
    @ApiProperty()
    MCD_DYSPOZYCJE_KOSZYK_ID: number;
    @ApiProperty()
    ILOSC: number;
    @ApiProperty()
    ZAZNACZONY: boolean;
}