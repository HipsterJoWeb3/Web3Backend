import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Tags, TagsSchema} from "./tags.model";


@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [MongooseModule.forFeature([{ name: Tags.name, schema: TagsSchema }])],
  exports: [TagsService]
})
export class TagsModule {}
