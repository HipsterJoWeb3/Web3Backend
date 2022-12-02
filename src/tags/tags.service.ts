import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

import {Model} from "mongoose";
import {Tags, TagsDocument} from "./tags.model";



@Injectable()
export class TagsService {
    constructor(@InjectModel(Tags.name) private tagsModel: Model<TagsDocument>) {}

    async create(value: string) {
        const checkTag = await this.tagsModel.findOne({value}).exec();
        if(checkTag) throw new HttpException('Tag already exists', HttpStatus.BAD_REQUEST);
        const tag = await this.tagsModel.create({value});
        return tag.save();
    }

    async getAll() {
        return this.tagsModel.find()
    }

    async getByName(value: string) {
        return this.tagsModel.findOne({value}).exec();
    }

    async delete(id: string) {
        return this.tagsModel.findByIdAndDelete(id).exec();
    }

    async getTagsById(id: string) {
        return this.tagsModel.findById(id).exec();
    }

    async getTagsByView() {
        return this.tagsModel.find().sort({views: -1}).exec();
    }


    async createTags(tags: string[]) : Promise<string[]> {
        const tagsFromDb = await this.getAll(); // get all tags from db
        const tagsFromDbNames = tagsFromDb.map(tag => tag.value); // get all tags names from db
        const tagsToCreate = tags.filter(tag => !tagsFromDbNames.includes(tag)); // get tags that not exist in db
        const tagsToReturn = tagsFromDb.filter(tag => tags.includes(tag.value)); // get tags that exist in db
        let createdTags = [];

        if(tagsToCreate.length) {
            createdTags = await Promise.all(tagsToCreate.map(tag => this.create(tag)));
            createdTags = await Promise.all(createdTags.map(item => item._id));
        }
        return [...tagsToReturn.map(item => item._id), ...createdTags]// return all tags
    }

    async getTagsByValue(tags: string[]) {
        return this.tagsModel.find({value: {$in: tags}}).exec();
    }

    async getPopularTags(limit: number) {
        return this.tagsModel.find().sort({views: -1}).limit(limit).exec();
    }
}
