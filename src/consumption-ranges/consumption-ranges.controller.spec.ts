import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionRangesController } from './consumption-ranges.controller';
import { ConsumptionRangesService } from './consumption-ranges.service';

describe('ConsumptionRangesController', () => {
  let controller: ConsumptionRangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionRangesController],
      providers: [ConsumptionRangesService],
    }).compile();

    controller = module.get<ConsumptionRangesController>(ConsumptionRangesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
