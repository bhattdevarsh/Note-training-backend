import { ICommand } from '@nestjs/cqrs';
import { NoteDto } from '../../entities/note/note.dto';

export class CreateNoteCommand implements ICommand {
  constructor(public note: NoteDto) {}
}
