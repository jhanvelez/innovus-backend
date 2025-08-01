import { Test, TestingModule } from '@nestjs/testing';
import { BillingConceptController } from './billing-concept.controller';
import { BillingConceptService } from './billing-concept.service';

describe('BillingConceptController', () => {
  let controller: BillingConceptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingConceptController],
      providers: [BillingConceptService],
    }).compile();

    controller = module.get<BillingConceptController>(BillingConceptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
