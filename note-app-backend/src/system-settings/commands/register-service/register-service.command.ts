import { ICommand } from '@nestjs/cqrs';
import { TokenCache } from '../../../auth/entities/token-cache/token-cache.entity';

export class RegisterServiceCommand implements ICommand {
  constructor(public readonly token: TokenCache) {}
}
