import { Module } from '@nestjs/common';
import { NoteService } from './note/note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note/note.entity';
import { UpdateNote } from './update-note/update-note.entity';
import { UpdateNoteService } from './update-note/update-note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note,UpdateNote])],
  exports: [NoteService,UpdateNoteService],
  controllers: [],
  providers: [NoteService,UpdateNoteService],
})
export class NoteEntityModule {}
