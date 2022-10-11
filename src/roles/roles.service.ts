import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RolesDocument, Roles} from "./roles.model";
import {CreateRoleDto} from "./dtos/create-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles.name) private rolesModel: Model<RolesDocument> ) {}

    async create(dto: CreateRoleDto) {
        const role = new this.rolesModel(dto);
        return role.save();
    }

    async getByValue(value: string) {
        const role = await this.rolesModel.findOne({value}).exec();
        if(!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        return role;
    }

    async getRolesById(id: string) {
        return this.rolesModel.findById(id).exec();
    }

    async delete(value: string) {
        return this.rolesModel.findOneAndDelete({value}).exec();
    }
}
