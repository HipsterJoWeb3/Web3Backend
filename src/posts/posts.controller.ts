import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    Get,
    Query,
    Param,
    Delete,
    UsePipes, Patch, Req, UseGuards
} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dtos/create-post.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ValidationPipe} from "../pipes/validation.pipe";
import {PostsAllGuard} from "../auth/posts-all.guard";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postsService.create(dto, image);
    }


    @Get()
    getAll(
        @Query('limit') limit: number,
        @Query('chapter') chapter: string,
        @Query('tag') tag: string,
        @Query('author') author: string,
        @Query('offset') offset: number,
        @Query('type') type: string,
        @Query('search') search: string
    ) {
        return this.postsService.getAll( limit, chapter, tag, author, offset, type, search);
    }


    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.postsService.getById( id);
    }

    @Get('/tag/:tag')
    getPostsByTagName( @Param('tag') tag: string, @Query('limit') limit: number) {
        return this.postsService.getPostsByTagName( tag, limit);
    }


    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.postsService.delete(id);
    }

    @Post('/uploadImage')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() image) {
        return this.postsService.uploadImage(image);
    }


    @Post('/hide')
    hidePost(@Body() {id, hide} :{id: string, hide: boolean}) {
        return this.postsService.hidePost(id, hide);
    }

    @Patch('/:id')
    updatePost(@Param('id') id: string, @Body() dto: CreatePostDto) {
        return this.postsService.updatePost(id, dto);
    }

    @Post('/uploadPreview/')
    @UseInterceptors(FileInterceptor('image'))
    updatePreview(@UploadedFile() image) {
        return this.postsService.uploadPreview(image);
    }

    @Get('/chapter/:id')
    getCountPostsByChapter(@Param('id') id: string) {
        return this.postsService.getCountPostsByChapter(id);
    }

}
