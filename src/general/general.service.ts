import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {General, GeneralDocument} from "./general.model";
import {CreateGeneralDto} from "./general.controller";
import {PagesService} from "../pages/pages.service";
import {parser} from "html-metadata-parser";

@Injectable()
export class GeneralService {
    constructor(
        @InjectModel(General.name) private generalModel: Model<GeneralDocument>,
        private pagesService:PagesService
        ) {}

    async create(dto: CreateGeneralDto) {
        const general = await this.generalModel.create(dto);
        return general;
    }

    async getGeneral() {
        const general = await this.generalModel.findOne().exec();
        if(!general) {
            const general = await this.generalModel.create({});
            return general;
        }
        return general;
    }

    update(dto: CreateGeneralDto) {
        return this.generalModel.findOneAndUpdate({}, dto, {new: true}).exec();
    }

    async fetchUrl(url: string) {
        try {
            const {meta, og}: any = await parser(url);

            return {
                success: 1,
                link: url,
                meta: {
                    title: meta.title,
                    description: meta.description,
                    image: {
                        url: og.image,
                    }
                }
            }
        } catch (e) {
            return {
                success: 0,
                error: e
            }
        }
    }
}
