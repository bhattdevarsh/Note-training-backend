import { ICommand } from '@nestjs/cqrs';
import { UpdateNoteDto } from 'src/note-management/entities/update-note/update-note.dto';

export class ProposeNoteEditCommand implements ICommand {
  constructor(public payload:UpdateNoteDto) {}
}
