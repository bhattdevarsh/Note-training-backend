import { IEvent } from '@nestjs/cqrs';

export class NoteEditRevertedEvent implements IEvent {
  constructor(public uuid: string) {}
}
