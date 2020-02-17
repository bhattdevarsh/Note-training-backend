import { IEvent } from '@nestjs/cqrs';
import { UpdateNote } from 'src/note-management/entities/update-note/update-note.entity';

export class NoteEditApprovedEvent implements IEvent {
  constructor(public payload: UpdateNote) {}
}
