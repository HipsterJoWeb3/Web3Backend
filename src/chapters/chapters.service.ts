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

    async getById(id: string) {
        return this.chapterModel.findById(id).exec();
    }

    async update(id: string, dto: CreateChapterDto) {

        const chapter = await this.chapterModel.findById(id).exec();
        if(!chapter) {
            throw new HttpException('Chapter is not found', HttpStatus.NOT_FOUND);
        }
        chapter.value = dto.value;
        chapter.description = dto.description;
        chapter.hidden = dto.hidden;
        chapter.count = dto.count;
        chapter.showPopular = dto.showPopular;
        chapter.showRecent = dto.showRecent;
        return chapter.save();
    }

    async hidden(id: string, hidden: boolean) {
        const chapter = await this.chapterModel.findById(id).exec();
        if(!chapter) {
            throw new HttpException('Chapter is not found', HttpStatus.NOT_FOUND);
        }
        chapter.hidden = hidden;
        return chapter.save();
    }

    async delete(id: string) {
        return this.chapterModel.findByIdAndDelete(id).exec();
    }
}
