import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {PagesService} from "./pages.service";
import {CreatePagesDto} from "./dtos/create-pages.dto";


@Controller('pages')
export class PagesController {
    constructor(private pagesService: PagesService) {}

    @Post()
    create(@Body() dto: CreatePagesDto) {
        return this.pagesService.create(dto);
    }

    @Get()
    getAll() {
        return this.pagesService.getAll();
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.pagesService.getByValue(value);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.pagesService.delete(id);
    }
}
