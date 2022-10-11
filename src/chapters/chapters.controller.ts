import {Controller, Post, Get, Body, Param, Query} from '@nestjs/common';
import {ChaptersService} from "./chapters.service";
import {CreateChapterDto} from "./dtos/create-chapter.dto";

@Controller('chapters')
export class ChaptersController {
    constructor(private chaptersService : ChaptersService) {}

    @Post()
    create(@Body() dto: CreateChapterDto) {
        return this.chaptersService.create(dto);
    }

    @Get()
    getAll(@Query('limit') limit: number) {
        return this.chaptersService.getAll(limit);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.chaptersService.getByValue(value);
    }

}
