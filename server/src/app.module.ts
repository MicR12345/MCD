import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebirdModule } from '@itm/firebird-interface';
import config from '../config';
import { AuthenticationModule } from './authentication/authentication.module';
import { LogicModule } from './logic/logic.module';
import { HeadersModule } from './headers/headers.module';
import { WgModule } from './wg/wg.module';
import { SettingsModule } from './settings/settings.module';
import { AttachmentModule } from './attachment/attachment.module';
import { DespositionModule } from './desposition/desposition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config]
    }),
    FirebirdModule.forRoot(config.firebird),
    AuthenticationModule,
    LogicModule,
    HeadersModule,
    WgModule,
    SettingsModule,
    AttachmentModule,
    DespositionModule
  ]
})
export class AppModule {}
