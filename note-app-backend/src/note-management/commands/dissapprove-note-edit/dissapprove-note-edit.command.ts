import { ICommand } from '@nestjs/cqrs';

export class DissapproveNoteEditCommand implements ICommand {
  constructor(public uuid:string) {}
}
