import { Module, Global, HttpModule } from '@nestjs/common';
import { AuthEntitiesModule } from './entities/auth-entities.module';
import { AuthServerVerificationGuard } from './guards/authserver-verification.guard';
import { RoleGuard } from './guards/role.guard';
import { TokenGuard } from './guards/token.guard';
import { AuthSchedulers } from './schedulers';
import { AuthControllers } from './controllers';
import { AuthAggregates } from './aggregates';

@Global()
@Module({
  imports: [AuthEntitiesModule, HttpModule],
  providers: [
    AuthServerVerificationGuard,
    RoleGuard,
    TokenGuard,

    ...AuthSchedulers,
    ...AuthAggregates,
  ],
  exports: [
    AuthEntitiesModule,
    AuthServerVerificationGuard,
    RoleGuard,
    TokenGuard,
    ...AuthAggregates,
  ],
  controllers: [...AuthControllers],
})
export class AuthModule {}
