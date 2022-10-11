import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
// @ts-ignore
import {JwtModule} from "@nestjs/jwt";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [AuthController],
  providers: [
      AuthService,

  ],
  imports: [
      forwardRef(() => UserModule),
      FilesModule,
      JwtModule.register({
        secret: process.env.SECRET_KEY || 'secretKey',
        signOptions: {expiresIn: '24h'}
      })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
