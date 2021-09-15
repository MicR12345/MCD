import { Module } from '@nestjs/common';
import { DespositionController } from './desposition.controller';
import { DespositionService } from './desposition.service';

@Module({
  controllers: [DespositionController],
  providers: [DespositionService]
})
export class DespositionModule {}
