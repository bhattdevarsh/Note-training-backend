import { Module, HttpModule } from '@nestjs/common';
import { NoteEntityModule } from './entities/note-entity.module';
import { NoteController } from './controllers/note/note.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { NoteCommandManager } from './commands';
import { NoteAggregateManager } from './aggregates';
import { NoteEventsManager } from './events';
import { ListeNoteManager } from './querries';
import { ValidateNoteManager } from './policies';
@Module({
  imports: [NoteEntityModule, CqrsModule,HttpModule],
  exports: [NoteEntityModule],
  controllers: [NoteController],
  providers: [
    ...NoteCommandManager,
    ...NoteAggregateManager,
    ...NoteEventsManager,
    ...ListeNoteManager,
    ...ValidateNoteManager,
  ],
})
export class NoteManagementModule {}
