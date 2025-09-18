import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionRangesService } from './consumption-ranges.service';

describe('ConsumptionRangesService', () => {
  let service: ConsumptionRangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionRangesService],
    }).compile();

    service = module.get<ConsumptionRangesService>(ConsumptionRangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
