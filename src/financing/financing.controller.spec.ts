import { Test, TestingModule } from '@nestjs/testing';
import { FinancingController } from './financing.controller';
import { FinancingService } from './financing.service';

describe('FinancingController', () => {
  let controller: FinancingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancingController],
      providers: [FinancingService],
    }).compile();

    controller = module.get<FinancingController>(FinancingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
