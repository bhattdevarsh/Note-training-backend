import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TokenCacheService } from '../../../auth/entities/token-cache/token-cache.service';
import { AuthServerVerificationGuard } from '../../../auth/guards/authserver-verification.guard';

@Controller('connect')
export class ConnectController {
  constructor(private readonly tokenCacheService: TokenCacheService) {}

  @Post('v1/token_delete')
  @UseGuards(AuthServerVerificationGuard)
  async tokenDelete(@Body('accessToken') accessToken) {
    await this.tokenCacheService.deleteMany({ accessToken });
  }

  @Post('v1/user_delete')
  @UseGuards(AuthServerVerificationGuard)
  userDelete(@Body('user') user) {
    // TODO: Logic to delete user or user related data if saved
  }
}
