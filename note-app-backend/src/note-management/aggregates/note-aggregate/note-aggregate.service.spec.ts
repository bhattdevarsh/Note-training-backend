import { Test, TestingModule } from '@nestjs/testing';
import { NoteAggregateService } from './note-aggregate.service';
import { NoteService } from '../../entities/note/note.service';
import { ValidateNoteService } from '../../policies/validate-note/validate-note.service';
import { ValidateAlreadyProposedEditService } from '../../policies/validate-already-proposed-edit/validate-already-proposed-edit.service';
import { ValidateUserRoles } from '../../policies/validate-user-role/validate-user-role.service';
import { UpdateNoteService } from '../../entities/update-note/update-note.service';

describe('NoteAggregateService', () => {
  let service: NoteAggregateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteAggregateService, {
        provide: NoteService,
        useValue: {}
      }, {
          provide: ValidateNoteService,
          useValue: {}
        }, {
          provide: ValidateAlreadyProposedEditService,
          useValue: {}
        }, {
          provide: ValidateUserRoles,
          useValue: {}
        }, {
          provide: UpdateNoteService,
          useValue: {}
        }],
    }).compile();

    service = module.get<NoteAggregateService>(NoteAggregateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
