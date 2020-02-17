import { CreateNoteHandler } from './create-note/create-note.handler';
import { DeleteNoteHandler } from './delete-note/delete-note.handler';
import { ProposeNoteEditHandler } from './update-note/propose-note-edit.handler';
import { ApproveNoteEditHandler } from './approve-note-edit/approve-note-edit.handler';
import { DissapproveNoteEditHandler } from './dissapprove-note-edit/dissapprove-note-edit.handler';

export const NoteCommandManager = [CreateNoteHandler,DeleteNoteHandler, ProposeNoteEditHandler,ApproveNoteEditHandler,DissapproveNoteEditHandler];
