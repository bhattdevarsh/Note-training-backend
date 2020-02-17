import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UpdateNoteService } from '../../entities/update-note/update-note.service';
import { NoteEditRevertedEvent } from './note-edit-reverted.event';

@EventsHandler(NoteEditRevertedEvent)
export class NoteEditRevertedHandler implements IEventHandler<NoteEditRevertedEvent> {
  constructor(private readonly updateNoteService: UpdateNoteService,) {}

  async handle(event: NoteEditRevertedEvent) {
    const { uuid } = event;
    await this.updateNoteService.deleteNewNote(uuid);
  }
}
