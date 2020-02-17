import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: MongoRepository<Note>,
  ) { }

  async create(payload: Note) {
    return await this.noteRepo.insertOne(payload);
  }
  async deleteNote(uuid: string) {
    await this.noteRepo.deleteOne({ uuid });
  }

  async readNote() {
    return await this.noteRepo.find();
  }

  async getNote(uuid: string) {
    return await this.noteRepo.findOne({ uuid });
  }

  async updateNote(payload: Note) {
    const uuid = payload.uuid

    return await this.noteRepo.updateOne({ uuid }, { $set: { title: payload.title, description: payload.description } })
  }
}
