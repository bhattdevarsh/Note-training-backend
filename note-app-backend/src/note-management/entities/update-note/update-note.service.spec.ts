import { Test, TestingModule } from '@nestjs/testing';
import { UpdateNoteService } from './update-note.service';
import { UpdateNote } from './update-note.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UpdateNoteService', () => {
  let service: UpdateNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateNoteService,{
        provide:getRepositoryToken(UpdateNote),
        useValue:{}
      }],
    }).compile();

    service = module.get<UpdateNoteService>(UpdateNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
