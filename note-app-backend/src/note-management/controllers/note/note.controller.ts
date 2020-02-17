import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNoteCommand } from '../../commands/create-note/create-note.command'
import { DeleteNoteCommand } from '../../commands/delete-note/delete-note.command';
import { NoteDto } from '../../entities/note/note.dto';
import { ListNoteQuery } from '../../querries/list/list-note.query';
import { RetriveNoteQuery } from '../../querries/retrive-note/retrive-note.query';
import { ProposeNoteEditCommand } from '../../commands/update-note/propose-note-edit.command';
import { ApproveNoteEditCommand } from '../../commands/approve-note-edit/approve-note-edit.command';
import { UpdateNoteDto } from '../../entities/update-note/update-note.dto';
import { DissapproveNoteEditCommand } from '../../commands/dissapprove-note-edit/dissapprove-note-edit.command';
import { TokenGuard } from '../../../auth/guards/token.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { RoleGuard } from '../../../auth/guards/role.guard';


@Controller('note')
export class NoteController {
  constructor(private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) { }

  @UseGuards(TokenGuard)
  @Post('v1/create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createNote(@Body() note: NoteDto) {
    return this.commandBus.execute(new CreateNoteCommand(note));
  }

  @UseGuards(TokenGuard)
  //@Roles('manager') 

  @Delete('v1/delete/:uuid')
  deleteNote(@Param('uuid') uuid: string) {
    return this.commandBus.execute(new DeleteNoteCommand(uuid));
  }

  @UseGuards(TokenGuard)
  @Get('v1/list')
  list() {
    return this.queryBus.execute(new ListNoteQuery());
  }
  @UseGuards(TokenGuard)
  @Get('v1/findnote/:uuid')
  getNote(@Param('uuid') uuid: string, @Req() req) {
    let userRole = req.token.roles
    console.log(userRole)
    return this.queryBus.execute(new RetriveNoteQuery(uuid, userRole))
  }

  @UseGuards(TokenGuard)
  @Post('v1/update')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateNote(@Body() payload: UpdateNoteDto) {
    return this.commandBus.execute(new ProposeNoteEditCommand(payload));
  }

  @UseGuards(TokenGuard, RoleGuard)
  @Roles('manager')
  @Get('v1/aproved/:uuid')
  aproved(@Param('uuid') uuid: string) {
    return this.commandBus.execute(new ApproveNoteEditCommand(uuid));
  }

  @UseGuards(TokenGuard, RoleGuard)
  @Roles('manager')
  @Get('v1/reverted/:uuid')
  disaprove(@Param('uuid') uuid: string) {
    return this.commandBus.execute(new DissapproveNoteEditCommand(uuid));
  }

}
