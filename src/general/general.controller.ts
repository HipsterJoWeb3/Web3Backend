import {Body, Controller, Get, Patch, Post} from '@nestjs/common';
import {GeneralService} from "./general.service";
import mongoose from "mongoose";

export interface CreateGeneralDto {
    title: string;
    subtitle: string;
    links: [{
        value: string;
        url: string;
    }];
    pagesOrder: [{
        page: mongoose.Schema.Types.ObjectId;
        index: number;
    }];
}

@Controller('general')
export class GeneralController {
    constructor(private generalService: GeneralService) {}

    @Post()
    create(@Body() dto: CreateGeneralDto) {
        return this.generalService.create(dto);
    }

    @Get()
    getGeneral() {
        return this.generalService.getGeneral();
    }

    @Patch()
    update(@Body() dto: CreateGeneralDto) {
        return this.generalService.update(dto);
    }
}
