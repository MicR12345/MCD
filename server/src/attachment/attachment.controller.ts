import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AttachmentService } from './attachment.service';
import { ApiParam, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('attachment')
@ApiTags('Załączniki')
export class AttachmentController {
    constructor(
        private readonly attachmentService: AttachmentService
      ) { }

    @Get('get/:id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: Buffer })
    public GetImgByHash(@Param('id') id: number, @Res() res: Response) {
      return this.attachmentService.GetImgByHash(id, res);
    }
}
