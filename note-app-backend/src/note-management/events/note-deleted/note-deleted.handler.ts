import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NoteService } from 'src/note-management/entities/note/note.service';
import { NoteDeletedEvent } from './note-deleted.event';
@EventsHandler(NoteDeletedEvent)
export class NoteDeletedHandler implements IEventHandler<NoteDeletedEvent> {
  constructor(private readonly noteService: NoteService) {}

  async handle(event: NoteDeletedEvent) {
    const { uuid } = event;
    await this.noteService.deleteNote(uuid);
  }
}
