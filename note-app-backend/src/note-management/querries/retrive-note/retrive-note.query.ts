import { IQuery } from '@nestjs/cqrs';

export class RetriveNoteQuery implements IQuery {
  constructor(public uuid: string, public userRole) { }
}
