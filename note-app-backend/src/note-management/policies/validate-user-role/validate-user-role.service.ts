import { Injectable } from '@nestjs/common';
@Injectable()
export class ValidateUserRoles {

    isManager(userRole) {
        if (userRole.indexOf('manager') !== -1) {
            return true
        }
        else {
            return false
        }

    }
}
