import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { TokenGuard } from '../../../auth/guards/token.guard';
import { RoleGuard } from '../../../auth/guards/role.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { ADMINISTRATOR } from '../../../constants/app-strings';
import { EventListQueryDto } from './list-query-dto';
import { ListEventsQuery } from '../../queries/list-event.query';
import { EventStoreContext } from '../../microservice/event-store.context';

@Controller('event_store')
export class EventStoreController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('v1/list')
  @Roles(ADMINISTRATOR)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  @UseGuards(TokenGuard, RoleGuard)
  async link(@Query() query: EventListQueryDto) {
    return await this.queryBus.execute(new ListEventsQuery(query));
  }

  /**
   * Events with pattern 'SomethingHappenedEvent'
   * it is subscribed event from the event store stream
   * use 'EventClassName' as convention
   *
   * @param data emitted from client is received here
   */
  @EventPattern('SomethingHappenedEvent')
  resolveEvent(payload: any, ctx: EventStoreContext) {
    // console.log('resolveEvent', { payload, ctx });
  }

  /**
   * Messages with pattern { cmd: 'SomethingHappenedEvent' }
   * it is subscribed event from the event store stream
   * use use { cmd: 'EventClassName' } as convention
   *
   * @param data sent from client is received here
   */
  @MessagePattern({ cmd: 'SomethingHappenedEvent' })
  processMessage(data: any) {
    // console.log('processMessage', { data });
  }
}
