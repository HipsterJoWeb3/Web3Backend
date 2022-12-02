import {Controller, Post, Body, Get, Param, UsePipes, Query} from '@nestjs/common';
import {TagsService} from "./tags.service";
import {ValidationPipe} from "../pipes/validation.pipe";

export interface CreateTagDto {
    value: string
}


@Controller('tags')
export class TagsController {
    constructor(private tagsService : TagsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() tag: CreateTagDto) {
        return this.tagsService.create(tag.value)
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.tagsService.getTagsById(id)
    }

    @Get()
    getPopularTags(@Query('limit') limit: number) {
        return this.tagsService.getPopularTags(limit)
    }


}
