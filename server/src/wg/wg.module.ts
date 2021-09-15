import { Module } from '@nestjs/common';
import { WgController } from './wg.controller';
import { WgService } from './wg.service';
import { LogicService } from 'src/logic/logic.service';
import { AttachmentService } from 'src/attachment/attachment.service';

@Module({
  controllers: [WgController],
  providers: [WgService, LogicService, AttachmentService]
})
export class WgModule {}
