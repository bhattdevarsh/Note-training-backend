import { Test, TestingModule } from '@nestjs/testing';
import { ValidateAlreadyProposedEditService } from './validate-already-proposed-edit.service';

describe('ValidateAlreadyProposedEditService', () => {
  let service: ValidateAlreadyProposedEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateAlreadyProposedEditService],
    }).compile();

    service = module.get<ValidateAlreadyProposedEditService>(ValidateAlreadyProposedEditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
