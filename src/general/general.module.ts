import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';
import {MongooseModule} from "@nestjs/mongoose";
import {General, GeneralSchema} from "./general.model";
import {Pages, PagesSchema} from "../pages/pages.model";
import {PagesModule} from "../pages/pages.module";

@Module({
  controllers: [GeneralController],
  providers: [GeneralService],
  imports: [
      MongooseModule.forFeature([ { name: General.name, schema: GeneralSchema } ]),
      MongooseModule.forFeature([ { name: Pages.name, schema: PagesSchema } ]),
      PagesModule
  ]
})
export class GeneralModule {}
