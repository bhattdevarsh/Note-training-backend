import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../../auth/guards/token.guard';

describe('Note Controller', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: CommandBus,
          useValue: {}
        },
        {
          provide: QueryBus,
          useValue: {}
        }
      ]
    })
      .overrideGuard(TokenGuard)
      .useValue({})
      .compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
