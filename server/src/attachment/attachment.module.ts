import { Module } from '@nestjs/common';
import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { LogicService } from 'src/logic/logic.service';

@Module({
  controllers: [AttachmentController],
  providers: [AttachmentService, LogicService]
})
export class AttachmentModule {}
