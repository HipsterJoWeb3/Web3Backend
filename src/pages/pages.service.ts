import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePagesDto} from "./dtos/create-pages.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Pages, PagesDocument} from "./pages.model";

@Injectable()
export class PagesService {
    constructor(@InjectModel(Pages.name) private pagesModel: Model<PagesDocument>,) {}

    async create(dto: CreatePagesDto) {
        const getPages = await this.pagesModel.findOne({value: dto.value}).exec();
        if(getPages) throw new HttpException('Page already exists', HttpStatus.BAD_REQUEST);
        return this.pagesModel.create(dto);
    }

    async getAll() {
        const pages = await this.pagesModel.find().exec();
        return pages;
    }

    async getByValue(value: string) {
        const page = await this.pagesModel.findOne({value}).exec();
        if(!page) throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
        return page;
    }

    async getPageById(id) {

        const page = await this.pagesModel.findById(id).exec();
        if(!page) throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
        return page;
    }

    async update(id: string, dto: CreatePagesDto) {
        const page = await this.pagesModel.findById(id).exec();
        if(!page) throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
        return this.pagesModel.findByIdAndUpdate(id, dto, {new: true}).exec();
    }

    async delete(id: string) {
        return this.pagesModel.findByIdAndDelete(id).exec();
    }


    async hidden(id: string, hidden: boolean) {
        const page = await this.pagesModel.findById(id).exec();
        if(!page) throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
        page.hidden = hidden;
        return page.save();
    }
}
