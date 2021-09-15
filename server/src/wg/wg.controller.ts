import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { WgService } from './wg.service';
import { WgParamsDto, WgSpecsParamsDto } from './dto/wg.params.dto';
import { WgDto, WgSpecsDto } from './dto/wg.dto';
import { JwtAuth } from 'src/authentication/guards/jwt-auth.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { IRequestJwt } from 'src/authentication/interfaces/request.interface';

@Controller('wg')
@ApiTags('Wyrób gotowy (WG)')
export class WgController {
    constructor(
        private readonly wgService: WgService
    ){}

    @Post()
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: WgParamsDto })
    @ApiOkResponse({ description: 'Pobranie wyrobów gotowych.', type: [WgDto] })
    public Get(@Body() params: WgParamsDto) {
      return this.wgService.Get(params);
    }

    @Post('/specs')
    @JwtAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: WgSpecsParamsDto })
    @ApiOkResponse({ description: 'Pobranie elementów dla wyrobów gotowych.', type: [WgSpecsDto] })
    public GetSpecs(@Body() params: WgSpecsParamsDto) {
      return this.wgService.GetSpecs(params);
    }


}
