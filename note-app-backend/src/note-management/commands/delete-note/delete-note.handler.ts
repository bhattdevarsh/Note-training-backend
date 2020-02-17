import { ICommandHandler, CommandHandler, EventPublisher } from "@nestjs/cqrs";
import { DeleteNoteCommand } from "./delete-note.command";
import { NoteAggregateService } from "src/note-management/aggregates/note-aggregate/note-aggregate.service";



@CommandHandler(DeleteNoteCommand)
export class DeleteNoteHandler implements ICommandHandler<DeleteNoteCommand>{
constructor(
    private readonly manager: NoteAggregateService ,
    private readonly publisher: EventPublisher,
    ){}

async execute(command: DeleteNoteCommand){
    const { uuid }=command;
    const aggregate=this.publisher.mergeObjectContext(this.manager)
    await aggregate.deleteNote(uuid)
    aggregate.commit();
}
}