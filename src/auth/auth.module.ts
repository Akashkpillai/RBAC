import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import {JwtModule} from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[UserModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
  JwtModule.register({
    global:true,
    secret:(process.env.jwt),
    signOptions:{expiresIn:"1d"}
  }),
  PassportModule.register({defaultStrategy:"jwt"}),
],
exports:[PassportModule]
})
export class AuthModule {}
