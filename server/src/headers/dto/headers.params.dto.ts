import { ApiProperty } from '@nestjs/swagger';

export class HeaderParams {
    @ApiProperty({ type: Date})
    data: string;
}