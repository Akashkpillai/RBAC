import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configFile from './config/config.file'

@Module({
  imports: [
  AuthModule,
  ConfigModule.forRoot({
    isGlobal:true,
    load:[configFile]
  }),
  MongooseModule.forRoot(process.env.DB_URL),
  UserModule
],
  controllers: [],
  providers: [],
})
export class AppModule {} 
