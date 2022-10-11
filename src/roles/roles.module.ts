import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {MongooseModule} from "@nestjs/mongoose";
import {RolesSchema, Roles} from "./roles.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
      MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
      JwtModule.register({
        secret: process.env.SECRET_KEY || 'secretKey',
        signOptions: {expiresIn: '24h'}
      })
  ],
  exports: [RolesService]
})
export class RolesModule {}
