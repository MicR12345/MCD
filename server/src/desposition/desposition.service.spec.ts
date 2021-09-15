import { Test, TestingModule } from '@nestjs/testing';
import { DespositionService } from './desposition.service';

describe('DespositionService', () => {
  let service: DespositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DespositionService],
    }).compile();

    service = module.get<DespositionService>(DespositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
