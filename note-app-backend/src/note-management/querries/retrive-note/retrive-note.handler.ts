import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { RetriveNoteQuery } from "./retrive-note.query";
import { NoteAggregateService } from "src/note-management/aggregates/note-aggregate/note-aggregate.service";

@QueryHandler(RetriveNoteQuery)
export class RetriveNoteHandler implements IQueryHandler<RetriveNoteQuery>{
    constructor(private readonly manager: NoteAggregateService, ) { }

    async execute(query: RetriveNoteQuery) {
        const { uuid } = query;
        const { userRole } = query
        return await this.manager.getNote(uuid, userRole);
    }
}