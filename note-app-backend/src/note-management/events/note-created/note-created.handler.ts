import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NoteCreatedEvent } from './note-created.event';
import { NoteService } from 'src/note-management/entities/note/note.service';
@EventsHandler(NoteCreatedEvent)
export class NoteCreatedHandler implements IEventHandler<NoteCreatedEvent> {
  constructor(private readonly noteService: NoteService) {}

  async handle(event: NoteCreatedEvent) {
    const { payload } = event;
    await this.noteService.create(payload);
  }
}
