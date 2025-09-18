import { Test, TestingModule } from '@nestjs/testing';
import { SubsidyContributionController } from './subsidy-contribution.controller';
import { SubsidyContributionService } from './subsidy-contribution.service';

describe('SubsidyContributionController', () => {
  let controller: SubsidyContributionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsidyContributionController],
      providers: [SubsidyContributionService],
    }).compile();

    controller = module.get<SubsidyContributionController>(SubsidyContributionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
