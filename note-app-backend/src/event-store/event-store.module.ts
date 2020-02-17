import { Module, HttpModule } from '@nestjs/common';
// import { EventStoreController } from './controllers/event-store/event-store.controller';
import { EventStoreSagas } from './sagas';
import { EventStoreCommandHandlers } from './commands';
import { EventStoreAggregates } from './aggregates';
// import { EventStoreQueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [HttpModule, CqrsModule],
  // controllers: [EventStoreController],
  providers: [
    ...EventStoreAggregates,
    ...EventStoreSagas,
    ...EventStoreCommandHandlers,
    // ...EventStoreQueryHandlers,
  ],
})
export class EventStoreModule {}

/**
 * Enable EventStoreController and EventStoreQueryHandlers
 * to subscribe EventPattern and listen MessagePattern
 * use it to list events for administrator
 */
