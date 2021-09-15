import { Test, TestingModule } from '@nestjs/testing';
import { DespositionController } from './desposition.controller';

describe('Desposition Controller', () => {
  let controller: DespositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DespositionController],
    }).compile();

    controller = module.get<DespositionController>(DespositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
