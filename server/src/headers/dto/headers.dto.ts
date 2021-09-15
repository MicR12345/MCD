import { ApiProperty } from '@nestjs/swagger';

export class HeaderDto {
    @ApiProperty()
    ID: number;
    @ApiProperty()
    KOD: string;
    @ApiProperty()
    RODZAJ: number;
    @ApiProperty()
    ILOSC_WYKORZYSTANA: number;
    @ApiProperty()
    ILOSC_MAX: number;
}