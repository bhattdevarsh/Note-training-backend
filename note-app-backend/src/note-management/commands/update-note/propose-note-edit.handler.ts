import { ICommandHandler, CommandHandler, EventPublisher } from "@nestjs/cqrs";
import { NoteAggregateService } from "src/note-management/aggregates/note-aggregate/note-aggregate.service";
import { ProposeNoteEditCommand } from "./propose-note-edit.command";


@CommandHandler(ProposeNoteEditCommand)
export class ProposeNoteEditHandler implements ICommandHandler<ProposeNoteEditCommand>{
    constructor(
        private readonly manager: NoteAggregateService,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: ProposeNoteEditCommand) {
        const { payload } = command;
        const aggregate = this.publisher.mergeObjectContext(this.manager)
        await aggregate.updateNote(payload)
        aggregate.commit();
    }
}