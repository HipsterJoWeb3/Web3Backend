import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import {TagsService} from "./tags.service";

export interface CreateTagDto {
    value: string
}


@Controller('tags')
export class TagsController {
    constructor(private tagsService : TagsService) {}

    @Post()
    create(@Body() tag: CreateTagDto) {
        return this.tagsService.create(tag.value)
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.tagsService.getTagsById(id)
    }



}
