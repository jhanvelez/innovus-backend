import { Test, TestingModule } from '@nestjs/testing';
import { SubsidiesController } from './subsidies.controller';
import { SubsidiesService } from './subsidies.service';

describe('SubsidiesController', () => {
  let controller: SubsidiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsidiesController],
      providers: [SubsidiesService],
    }).compile();

    controller = module.get<SubsidiesController>(SubsidiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
