import { Test, TestingModule } from '@nestjs/testing';
import { CyclesRoutesService } from './cycles-routes.service';

describe('CyclesRoutesService', () => {
  let service: CyclesRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CyclesRoutesService],
    }).compile();

    service = module.get<CyclesRoutesService>(CyclesRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
