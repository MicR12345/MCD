import { Test, TestingModule } from '@nestjs/testing';
import { WgController } from './wg.controller';

describe('Wg Controller', () => {
  let controller: WgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WgController],
    }).compile();

    controller = module.get<WgController>(WgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
