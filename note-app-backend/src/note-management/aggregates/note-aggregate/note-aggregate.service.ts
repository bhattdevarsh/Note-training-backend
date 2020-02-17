import { Injectable, BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { NoteCreatedEvent } from '../../events/note-created/note-created.event';
import { NoteDto } from '../../entities/note/note.dto';
import { Note } from '../../entities/note/note.entity';
import * as uuidv4 from 'uuid/v4';
import { NoteDeletedEvent } from '../../events/note-deleted/note-deleted.event';
import { NoteService } from '../../entities/note/note.service';
import { UpdateNote } from '../../entities/update-note/update-note.entity';
import { NoteEditProposedEvent } from '../../events/note-edit-proposed/note-edit-proposed.event';
import { NoteEditApprovedEvent } from '../../events/note-edit-approved/note-edit-approved.event';
import { UpdateNoteDto } from '../../entities/update-note/update-note.dto';
import { NoteEditRevertedEvent } from '../../events/note-edit-reverted/note-edit-reverted.event';
import { ValidateNoteService } from '../../policies/validate-note/validate-note.service';
import { ValidateAlreadyProposedEditService } from '../../policies/validate-already-proposed-edit/validate-already-proposed-edit.service';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ValidateUserRoles } from '../../policies/validate-user-role/validate-user-role.service';
import { UpdateNoteService } from '../../entities/update-note/update-note.service';

@Injectable()
export class NoteAggregateService extends AggregateRoot {
  constructor(private readonly noteService: NoteService,
    private readonly validateNote: ValidateNoteService,
    private readonly alreadyProposed: ValidateAlreadyProposedEditService,
    private readonly validateUserRole: ValidateUserRoles,
    private readonly updateNoteService: UpdateNoteService
  ) {
    super();
  }

  createNote(note: NoteDto) {
    const payload = new Note();
    payload.uuid = uuidv4();
    Object.assign(payload, note);
    this.apply(new NoteCreatedEvent(payload));
  }

  async deleteNote(uuid) {
    await this.validateNote.noteExist(uuid)
    this.apply(new NoteDeletedEvent(uuid));
  }

  async readNote() {
    return await this.noteService.readNote()
  }
  async getNote(uuid: string, userRole) {
    return from(this.noteService.getNote(uuid)).pipe(
      switchMap(
        note => {
          console.log(this.validateUserRole.isManager(userRole));

          if (this.validateUserRole.isManager(userRole)) {
            return from(this.updateNoteService.fetchNoteIfManager(uuid)).pipe(
              switchMap(
                proposeNote => {
                  return of({ note, proposal: proposeNote })
                }
              )// inner switch
            )// inner pipe
          }// if
          else {
            return of({ note })
          }
        }
      )// outer switch
    )//outer pipe

  }
  async updateNote(oldNote: UpdateNoteDto) {

    if (await this.alreadyProposed.isAlreadyProposed(oldNote.uuid)) {
      const newNote = new UpdateNote();
      Object.assign(newNote, oldNote);
      this.apply(new NoteEditProposedEvent(newNote))
    }
    else {
      throw new BadRequestException("The Note Request Already sent! please wait for manager to take action")
    }
  }

  async approveNote(uuid: string) {
    const updateNote = await UpdateNote.findOne({ uuid })
    const payload = new Note();
    payload.uuid = updateNote.uuid
    payload.title = updateNote.title
    payload.description = updateNote.description
    //this.noteService.updateNote(payload)
    this.apply(new NoteEditApprovedEvent(payload))
  }

  async deleteNewData(uuid: string) {
    this.apply(new NoteEditRevertedEvent(uuid))
  }
}
