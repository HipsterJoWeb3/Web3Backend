import {Controller, Post, Get, Body, Param, Query, Patch, Delete} from '@nestjs/common';
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

    @Patch('/:id')
    update(@Param('id') id: string, @Body() dto: CreateChapterDto) {
        return this.chaptersService.update(id, dto);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.chaptersService.getByValue(value);
    }

    @Post('/hidden')
    hidden(@Body('id') id: string, @Body('hidden') hidden: boolean) {
        return this.chaptersService.hidden(id, hidden);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.chaptersService.delete(id);
    }

}
