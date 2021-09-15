import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt.strategy';
import config from '../../config';
import { LogicService } from 'src/logic/logic.service';

@Module({
  imports: [JwtModule.register(config.jwt)],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LogicService],
  exports: [JwtStrategy],
})
export class AuthenticationModule {}
