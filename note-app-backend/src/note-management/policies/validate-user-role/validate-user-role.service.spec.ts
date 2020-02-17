import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserRoles } from './validate-user-role.service';

describe('ValidateNoteService', () => {
  let service: ValidateUserRoles;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateUserRoles],
    }).compile();

    service = module.get<ValidateUserRoles>(ValidateUserRoles);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
