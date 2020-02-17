import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNote } from './update-note.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UpdateNoteService {
  constructor(
    @InjectRepository(UpdateNote)
    private readonly updateNoteRepo: MongoRepository<UpdateNote>
  ) { }


  async proposedNote(payload: UpdateNote) {
    return await this.updateNoteRepo.insertOne(payload);
  }

  async deleteNote(payload: UpdateNote) {
    const uuid = payload.uuid
    return await this.updateNoteRepo.deleteOne({ uuid })
  }

  async deleteNewNote(uuid: string) {
    return await this.updateNoteRepo.deleteOne({ uuid })
  }

  async fetchNoteIfManager(uuid) {
    const proposal = await this.updateNoteRepo.findOne({ uuid })
    return proposal
  }
}
