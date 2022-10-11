import {Controller, Post, Body, UseInterceptors, UploadedFile, Get, Query, Param} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dtos/create-post.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postsService.create(dto, image);
    }

    @Get()
    getAll(@Query('limit') limit: number) {
        return this.postsService.getAll(limit);
    }


    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.postsService.getById(id);
    }

    @Get('/tag/:tag')
    getPostsByTagName(@Param('tag') tag: string, @Query('limit') limit: number) {
        return this.postsService.getPostsByTagName(tag, limit);
    }

    @Get('/chapter/:value')
    getPostsByChapterValue(@Param('value') value: string, @Query('limit') limit: number) {
        return this.postsService.getPostsByChapterValue(value, limit);
    }
}
