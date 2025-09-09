import { Test, TestingModule } from '@nestjs/testing';
import { FinancingService } from './financing.service';

describe('FinancingService', () => {
  let service: FinancingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancingService],
    }).compile();

    service = module.get<FinancingService>(FinancingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
