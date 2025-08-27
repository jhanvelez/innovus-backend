import { Test, TestingModule } from '@nestjs/testing';
import { CyclesRoutesController } from './cycles-routes.controller';
import { CyclesRoutesService } from './cycles-routes.service';

describe('CyclesRoutesController', () => {
  let controller: CyclesRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CyclesRoutesController],
      providers: [CyclesRoutesService],
    }).compile();

    controller = module.get<CyclesRoutesController>(CyclesRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
