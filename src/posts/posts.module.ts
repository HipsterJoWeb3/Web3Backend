import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/user.model";
import {Tags, TagsSchema} from "../tags/tags.model";
import {FilesModule} from "../files/files.module";
import {Posts, PostsSchema} from "./posts.model";
import {UserModule} from "../user/user.module";
import {TagsModule} from "../tags/tags.module";
import {ChaptersModule} from "../chapters/chapters.module";
import {Chapter, ChapterSchema} from "../chapters/chapters.model";


@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostsSchema },
      { name: User.name, schema: UserSchema },
      { name: Tags.name, schema: TagsSchema },
      { name: Chapter.name, schema: ChapterSchema },
    ]),
    FilesModule,
    ChaptersModule,
    forwardRef(() => TagsModule),
    forwardRef(() => UserModule),
  ],
  exports: [PostsService]
})
export class PostsModule {}
