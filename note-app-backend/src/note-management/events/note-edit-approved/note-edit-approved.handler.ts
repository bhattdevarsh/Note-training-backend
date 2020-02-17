import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UpdateNoteService } from '../../entities/update-note/update-note.service';
import { NoteEditApprovedEvent } from './note-edit-approved.event';
import { NoteService } from '../../entities/note/note.service';

@EventsHandler(NoteEditApprovedEvent)
export class NoteEditApprovedHandler implements IEventHandler<NoteEditApprovedEvent> {
  constructor(private readonly updateNoteService: UpdateNoteService,
    private readonly noteService: NoteService) {}

  async handle(event: NoteEditApprovedEvent) {
    const { payload } = event;
    await this.noteService.updateNote(payload);
    await this.updateNoteService.deleteNote(payload);
  }
}
