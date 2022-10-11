import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {General, GeneralDocument} from "./general.model";
import {CreateGeneralDto} from "./general.controller";

@Injectable()
export class GeneralService {
    constructor(@InjectModel(General.name) private generalModel: Model<GeneralDocument>,) {}

    async create(dto: CreateGeneralDto) {
        const general = await this.generalModel.create(dto);
        return general;
    }

    async getGeneral() {
        return this.generalModel.findOne().exec();
    }

    update(dto: CreateGeneralDto) {
        return this.generalModel.findOneAndUpdate({}, dto, {new: true}).exec();
    }
}
