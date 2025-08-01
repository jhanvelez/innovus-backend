import { Test, TestingModule } from '@nestjs/testing';
import { PredioService } from './predio.service';

describe('PredioService', () => {
  let service: PredioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredioService],
    }).compile();

    service = module.get<PredioService>(PredioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
