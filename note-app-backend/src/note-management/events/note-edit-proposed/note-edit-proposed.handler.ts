import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NoteEditProposedEvent } from './note-edit-proposed.event';
import { UpdateNoteService } from 'src/note-management/entities/update-note/update-note.service';
@EventsHandler(NoteEditProposedEvent)
export class NoteEditProposedHandler implements IEventHandler<NoteEditProposedEvent> {
  constructor(private readonly updateNoteService: UpdateNoteService) {}

  async handle(event: NoteEditProposedEvent) {
    const { payload } = event;
    await this.updateNoteService.proposedNote(payload);
  }
}
