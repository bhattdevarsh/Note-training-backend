import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NoteAggregateService } from 'src/note-management/aggregates/note-aggregate/note-aggregate.service';
import { DissapproveNoteEditCommand } from './dissapprove-note-edit.command';

@CommandHandler(DissapproveNoteEditCommand)
export class DissapproveNoteEditHandler implements ICommandHandler<DissapproveNoteEditCommand> {
  constructor(
    private readonly manager: NoteAggregateService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DissapproveNoteEditCommand) {
    const { uuid } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.deleteNewData(uuid);
    aggregate.commit();
  }
}
