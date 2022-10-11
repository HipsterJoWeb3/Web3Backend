import {Controller, Post, Body, UseInterceptors, UploadedFile, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dtos/create-user.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Roles} from "./auth-roles.decorator";
import {RolesGuard} from "./roles.guard";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/registration')
    @UseInterceptors(FileInterceptor('image'))
    registration(@Body() dto: CreateUserDto, @UploadedFile() image) {
        return this.authService.registration(dto, image);
    }
}

