import { Test, TestingModule } from '@nestjs/testing';
import { SuscriptorService } from './suscriptor.service';

describe('SuscriptorService', () => {
  let service: SuscriptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuscriptorService],
    }).compile();

    service = module.get<SuscriptorService>(SuscriptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
