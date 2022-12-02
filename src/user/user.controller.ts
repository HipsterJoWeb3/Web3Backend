import {Controller, Post, Body, Get, Param, Delete, UseGuards, UsePipes, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AddRoleDto} from "./dtos/add-role.dto";
import {Roles} from "../auth/auth-roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {ValidationPipe} from "../pipes/validation.pipe";



@Controller('/users')
export class UserController {

    constructor(private userService: UserService) {}



    @Get()
    getAll(@Query('role') role: string) {
        return this.userService.getAll(role);
    }

    @Get('/:username')
    getUserByUsername(@Param('username') username: string) {
        return this.userService.getUserByUsername(username);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() {id, banReason}: { id: string, banReason: string }) {
        return this.userService.ban(id, banReason);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/unban')
    unban(@Body('id') id: string) {
        return this.userService.unban(id);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/add-admin')
    createAdmin(@Body('id') id: string) {
        return this.userService.addAdmin(id);
    }


}
