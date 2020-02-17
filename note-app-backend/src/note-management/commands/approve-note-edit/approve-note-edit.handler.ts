import { ICommandHandler, CommandHandler, EventPublisher } from "@nestjs/cqrs";
import { NoteAggregateService } from "src/note-management/aggregates/note-aggregate/note-aggregate.service";
import { ApproveNoteEditCommand } from "./approve-note-edit.command";



@CommandHandler(ApproveNoteEditCommand)
export class ApproveNoteEditHandler implements ICommandHandler<ApproveNoteEditCommand>{
constructor(
    private readonly manager: NoteAggregateService ,
    private readonly publisher: EventPublisher,
    ){}

async execute(command: ApproveNoteEditCommand){
    const { uuid }=command;
    const aggregate=this.publisher.mergeObjectContext(this.manager)
    await aggregate.approveNote(uuid)
    aggregate.commit();
}
}