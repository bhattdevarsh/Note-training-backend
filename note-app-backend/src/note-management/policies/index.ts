import { ValidateNoteService } from "./validate-note/validate-note.service";
import { ValidateAlreadyProposedEditService } from "./validate-already-proposed-edit/validate-already-proposed-edit.service";
import { ValidateUserRoles } from "./validate-user-role/validate-user-role.service";

export const ValidateNoteManager = [ValidateNoteService, ValidateAlreadyProposedEditService, ValidateUserRoles];
