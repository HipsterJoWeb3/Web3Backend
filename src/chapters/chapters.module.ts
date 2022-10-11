import { Module } from '@nestjs/common';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Chapter, ChapterSchema} from "./chapters.model";

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService],
  imports: [
      MongooseModule.forFeature([
            { name: Chapter.name, schema: ChapterSchema },
      ]),
  ],
  exports: [ChaptersService]
})
export class ChaptersModule {}
