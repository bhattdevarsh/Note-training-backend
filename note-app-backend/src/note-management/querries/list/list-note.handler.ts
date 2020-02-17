import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { ListNoteQuery } from "./list-note.query";
import { NoteAggregateService } from "src/note-management/aggregates/note-aggregate/note-aggregate.service";

@QueryHandler(ListNoteQuery)
export class ListNoteHandler implements IQueryHandler<ListNoteQuery>{
    constructor(private readonly manager: NoteAggregateService, ) { }

    async execute(query: ListNoteQuery) {
        return this.manager.readNote();
    }

}