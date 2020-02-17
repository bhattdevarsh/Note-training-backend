import { IEvent } from '@nestjs/cqrs';
import { Note } from 'src/note-management/entities/note/note.entity';

export class NoteCreatedEvent implements IEvent {
  constructor(public payload: Note) {}
}
