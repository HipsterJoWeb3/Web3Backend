import {Controller, Post, Get, Body, Param, Delete, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {Roles} from "../auth/auth-roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateRoleDto} from "./dtos/create-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.create(dto);
    }


    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getByValue(value);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:value')
    delete(@Param('value') value: string) {
        return this.rolesService.delete(value);
    }
}
