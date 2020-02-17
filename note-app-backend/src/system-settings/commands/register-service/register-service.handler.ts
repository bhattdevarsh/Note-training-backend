import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RegisterServiceCommand } from './register-service.command';
import { SettingsService } from '../../aggregates/settings/settings.service';

@CommandHandler(RegisterServiceCommand)
export class RegisterServiceHandler
  implements ICommandHandler<RegisterServiceCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly manager: SettingsService,
  ) {}

  async execute(command: RegisterServiceCommand) {
    const { token } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.registerService(token);
    aggregate.commit();
  }
}
