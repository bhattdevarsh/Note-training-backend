import { Injectable } from '@nestjs/common';
import { UpdateNote } from '../../entities/update-note/update-note.entity';

@Injectable()
export class ValidateAlreadyProposedEditService {

    async isAlreadyProposed(uuid) {
        if (await UpdateNote.findOne({ uuid })) {
            return false
        }
        else { return true }
    }
}
