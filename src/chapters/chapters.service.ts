import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateChapterDto} from "./dtos/create-chapter.dto";
import {InjectModel} from "@nestjs/mongoose";

import {Model} from "mongoose";
import {Chapter, ChapterDocument} from "./chapters.model";

@Injectable()
export class ChaptersService {
    constructor(@InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>) {}

    async create(dto: CreateChapterDto) {
        const checkChapter = await this.chapterModel.findOne({value: dto.value}).exec();
        if(checkChapter) {
            throw new HttpException('Chapter already exists', HttpStatus.BAD_REQUEST);
        }
        const chapter = await this.chapterModel.create(dto);
        return chapter.save();
    }

    async getAll(limit: number) {
        return this.chapterModel.find().limit(limit).exec();
    }

    async getByValue(value: string) {
        return this.chapterModel.findOne({value}).exec();
    }
}
