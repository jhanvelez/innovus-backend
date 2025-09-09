import { Test, TestingModule } from '@nestjs/testing';
import { StratumController } from './stratum.controller';

describe('StratumController', () => {
  let controller: StratumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StratumController],
    }).compile();

    controller = module.get<StratumController>(StratumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
