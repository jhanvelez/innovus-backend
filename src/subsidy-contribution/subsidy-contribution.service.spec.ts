import { Test, TestingModule } from '@nestjs/testing';
import { SubsidyContributionService } from './subsidy-contribution.service';

describe('SubsidyContributionService', () => {
  let service: SubsidyContributionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsidyContributionService],
    }).compile();

    service = module.get<SubsidyContributionService>(SubsidyContributionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
