import { ICommand } from '@nestjs/cqrs';

export class ApproveNoteEditCommand implements ICommand {
  constructor(public uuid:string) {}
}
