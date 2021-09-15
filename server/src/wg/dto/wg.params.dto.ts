import { ApiProperty } from '@nestjs/swagger';

export class WgParamsDto {
    @ApiProperty({ type: Number})
    ID: number;
    @ApiProperty({ type: Number})
    RODZAJ: number;
}

export class WgSpecsParamsDto {
    @ApiProperty()
    ID: number;
    @ApiProperty()
    RODZAJ: number;
    //String z zawartoscia koszyka 'artykul_id*wgr_kod*ilosc^artykul_id*wgr_kod_ikosc^...'
    @ApiProperty()
    KOSZYK: string;
}