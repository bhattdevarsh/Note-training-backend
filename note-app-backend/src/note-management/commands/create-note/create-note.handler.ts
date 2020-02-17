import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NoteAggregateService } from 'src/note-management/aggregates/note-aggregate/note-aggregate.service';
import { CreateNoteCommand } from './create-note.command';

@CommandHandler(CreateNoteCommand)
export class CreateNoteHandler implements ICommandHandler<CreateNoteCommand> {
  constructor(
    private readonly manager: NoteAggregateService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateNoteCommand) {
    const { note } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.createNote(note);
    aggregate.commit();
  }
}
