import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from "./user.model";
import {Roles, RolesSchema} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {PostsModule} from "../posts/posts.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
      MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Roles.name, schema: RolesSchema },
      ]),
      RolesModule,
      forwardRef(() => AuthModule),
      forwardRef(() => PostsModule)
  ],
  exports: [UserService]
})
export class UserModule {}
