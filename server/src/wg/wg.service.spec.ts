import { Test, TestingModule } from '@nestjs/testing';
import { WgService } from './wg.service';

describe('WgService', () => {
  let service: WgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WgService],
    }).compile();

    service = module.get<WgService>(WgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
