import {Controller, Post, Body, Get, UseInterceptors, UploadedFile, UseGuards, UsePipes, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dtos/create-user.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Roles} from "./auth-roles.decorator";
import {RolesGuard} from "./roles.guard";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "./jwt-auth.guard";

export interface refreshTokenDto {
    token: string
}

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/registration')
    @UseInterceptors(FileInterceptor('image'))
    registration(@Body() dto: CreateUserDto, @UploadedFile() image) {
        return this.authService.registration(dto, image);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/refresh')
    getUserByToken(@Request() dto: any) {
        return dto.user
    }
}
