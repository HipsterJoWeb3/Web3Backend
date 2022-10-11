import {Controller, Post, Body, Get, Param, Delete, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AddRoleDto} from "./dtos/add-role.dto";
import {Roles} from "../auth/auth-roles.decorator";
import {RolesGuard} from "../auth/roles.guard";



@Controller('/users')
export class UserController {

    constructor(private userService: UserService) {}



    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Get('/:username')
    getUserByUsername(@Param('username') username: string) {
        return this.userService.getUserByUsername(username);
    }

    @Roles('MODER')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

}
