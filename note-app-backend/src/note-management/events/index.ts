import { NoteCreatedHandler } from './note-created/note-created.handler';
import { NoteDeletedHandler } from './note-deleted/note-deleted.handler';
import { NoteEditProposedHandler } from './note-edit-proposed/note-edit-proposed.handler';
import { NoteEditApprovedHandler } from './note-edit-approved/note-edit-approved.handler';
import { NoteEditRevertedHandler } from './note-edit-reverted/note-edit-reverted.handler';

export const NoteEventsManager = [NoteCreatedHandler,NoteDeletedHandler,NoteEditProposedHandler,NoteEditApprovedHandler,NoteEditRevertedHandler];
