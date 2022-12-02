import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {GeneralService} from "./general.service";
import mongoose from "mongoose";

export interface CreateGeneralDto {
    title: string;
    subtitle: string;
    links: [{
        value: string;
        url: string;
    }];
    description: string;
    keywords: string[];
    animationLinks: [{
        value: string;
        url: string;
    }]
    someInformation: [{
        title: string;
        subtitle: string;
        imageUrl: string;
        hidden: boolean;
    }]
    animationText: [{
        text: string;
        duration: number;
        hidden: boolean;
    }]
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

    @Get('/fetchUrl')
    fetchUrl(@Query('url') url: string) {
        return this.generalService.fetchUrl(url);
    }


}
