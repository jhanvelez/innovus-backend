import { Test, TestingModule } from '@nestjs/testing';
import { StratumService } from './stratum.service';

describe('StratumService', () => {
  let service: StratumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StratumService],
    }).compile();

    service = module.get<StratumService>(StratumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
