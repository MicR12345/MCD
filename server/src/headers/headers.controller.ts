import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { HeadersService } from './headers.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HeaderParams } from './dto/headers.params.dto';
import { HeaderDto } from './dto/headers.dto';
import { JwtAuth } from 'src/authentication/guards/jwt-auth.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { IRequestJwt } from 'src/authentication/interfaces/request.interface';

@Controller('headers')
@ApiTags('Info o nagłówkach')
export class HeadersController {
    constructor(
        private readonly headersService: HeadersService
    ){}

    @Post()
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: HeaderParams })
    @ApiOkResponse({ description: 'Pobranie nagłówków dla podanej daty.', type: [HeaderDto] })
    public Get(@Req() req: IRequestJwt, @Body() params: HeaderParams) {
      return this.headersService.Get(req, params);
    }

    @Get('all')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Pobranie wszystkich dostępnych nagłówków.', type: HeaderDto })
    public GetAll(@Req() req: IRequestJwt) {
      return this.headersService.GetAll(req);
    }
}
