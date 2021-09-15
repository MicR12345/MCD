import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from 'src/authentication/guards/jwt-auth.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { IRequestJwt } from 'src/authentication/interfaces/request.interface';
import { DespositionService } from './desposition.service';
import { CreateDespositionDto, DespositionResultDto, GetDespositionDto, GetDespositionSpecDto } from './dto/desposition.dto';
import { CartUpdateParams, CreateDespositionParams, ListSaveCartParams } from './dto/desposition.params.dto';

@Controller('desposition')
@ApiTags('Dyspozycje')
export class DespositionController {
    constructor(
        private readonly despositionService: DespositionService
    ){}

    @Get('get')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Pobranie dyspozycji dla user-a', type: [GetDespositionDto] })
    public Get(@Req() req: IRequestJwt) {
      return this.despositionService.Get(req);
    }
    
    @Get('get/spec/:id')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ description: 'Pobranie dyspozycji spec dla podanego MCD_DYSPOZYCJE_ID oraz statusu.', type: [GetDespositionSpecDto] })
    public GetSpec(@Param('id') id: number) {
      return this.despositionService.GetSpec(id);
    }

    @Post('cart/save')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: ListSaveCartParams })
    @ApiOkResponse({ description: 'Zapisanie elementów do koszyka.', type: String })
    public CartSave(@Req() req: IRequestJwt, @Body() params: ListSaveCartParams) {
      return this.despositionService.CartSave(req, params.Elements);
    }

    @Patch('cart/update')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CartUpdateParams })
    @ApiOkResponse({ description: 'Aktualizacja ilości elementów.', type: String })
    public CartUpdate(@Req() req: IRequestJwt, @Body() params: CartUpdateParams) {
      return this.despositionService.CartUpdate(req, params);
    }

    @Delete('cart/delete/:id')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ description: 'Usunięcie elementu z koszyka.', type: String })
    public CartDelete(@Param('id') id: number) {
      return this.despositionService.CartDelete(id);
    }

    @Get('cart/count')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Zliczenie elementów w koszyku dla zalogowanego user-a.', type: Number })
    public CartCount(@Req() req: IRequestJwt) {
      return this.despositionService.CartCount(req);
    }

    @Get('cart/get')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Pobranie zawartości koszyka.', type: [DespositionResultDto]})
    public CartGet(@Req() req: IRequestJwt) {
      return this.despositionService.CartGet(req);
    }

    @Post('cart/create/desposition')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreateDespositionParams, description: `Parametrem wejściowym jest lista MCD_DYSPOZYCJE_KOSZYK_ID.`})
    @ApiOkResponse({ description: 'Złożenie zamówienia z poziomu widoku koszyka.', type: CreateDespositionDto })
    public CartCreateOrder(@Body() list: CreateDespositionParams) {
      return this.despositionService.CartCreateDesposition(list.Elements);
    }

    @Post('create/desposition')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: ListSaveCartParams })
    @ApiOkResponse({ description: 'Złożenie zamówienia z poziomu widoku elementów wyrobu gotowego.', type: CreateDespositionDto })
    public CreateOrder(@Req() req: IRequestJwt, @Body() params: ListSaveCartParams) {
      return this.despositionService.CreateDesposition(req, params.Elements);
    }
}
