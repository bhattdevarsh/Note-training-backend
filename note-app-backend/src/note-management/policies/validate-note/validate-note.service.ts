import { Injectable, BadRequestException } from '@nestjs/common';
import { Note } from '../../entities/note/note.entity';

@Injectable()
export class ValidateNoteService {

    async noteExist(uuid) {
        if (await Note.count({ uuid }) === 0) {
            throw new BadRequestException("No Data Found with given uuid")
        }
    }
}
