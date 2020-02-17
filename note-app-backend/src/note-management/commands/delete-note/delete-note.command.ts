import { ICommand } from '@nestjs/cqrs';

export class DeleteNoteCommand implements ICommand {
  constructor(public uuid:string) {}
}
