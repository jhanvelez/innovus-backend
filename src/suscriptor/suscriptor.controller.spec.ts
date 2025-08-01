import { Test, TestingModule } from '@nestjs/testing';
import { SuscriptorController } from './suscriptor.controller';
import { SuscriptorService } from './suscriptor.service';

describe('SuscriptorController', () => {
  let controller: SuscriptorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuscriptorController],
      providers: [SuscriptorService],
    }).compile();

    controller = module.get<SuscriptorController>(SuscriptorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
