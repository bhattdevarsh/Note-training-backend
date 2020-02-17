import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { SystemSettingsModule } from './system-settings/system-settings.module';
import { EventStoreModule } from './event-store/event-store.module';
import { connectTypeORM } from './constants/typeorm.connection';
import { ConfigService } from './config/config.service';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './system-settings/aggregates/terminus-options/terminus-options.service';
import { NoteManagementModule } from './note-management/note-management.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: connectTypeORM,
      inject: [ConfigService],
    }),
    TerminusModule.forRootAsync({ useClass: TerminusOptionsService }),
    ConfigModule,
    AuthModule,
    SystemSettingsModule,
    EventStoreModule,
    NoteManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
