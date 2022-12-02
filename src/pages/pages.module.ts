import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import {Pages, PagesSchema} from "./pages.model";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  controllers: [PagesController],
  providers: [PagesService],
  imports: [
    MongooseModule.forFeature([{ name: Pages.name, schema: PagesSchema }]),

  ],
    exports: [PagesService]
})
export class PagesModule {}
