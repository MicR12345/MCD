import { Test, TestingModule } from '@nestjs/testing';
import { HeadersController } from './headers.controller';

describe('Headers Controller', () => {
  let controller: HeadersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadersController],
    }).compile();

    controller = module.get<HeadersController>(HeadersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
