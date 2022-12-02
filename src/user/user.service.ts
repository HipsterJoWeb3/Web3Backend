import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.model";
import {Model} from "mongoose";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dtos/add-role.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private rolesService: RolesService
    ) {}

    async create(dto: CreateUserDto) {
        const user = new this.userModel(dto);
        const role = await this.rolesService.getByValue('MODER');

        user.roles = [role._id];
        return user.save();
    }

    async getAll(role: string) {

        let users = []
        if(role) {
            const currentRole = await this.rolesService.getByValue(role);
            users = await this.userModel.find({roles: currentRole?._id}).exec();
        } else {
            users = await this.userModel.find().exec();
        }

        return Promise.all(users.map(user => this.ParseRole(user)));
    }

    async getUserByUsername(username: string) {
        const user = await this.userModel.findOne({username}).exec();
        return user ?  this.ParseRole(user) : null;
    }

    async delete(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userModel.findById(dto.userId).exec();
        const role = await this.rolesService.getByValue(dto.value);


        if(user.roles.includes(role._id)) throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
        if (role && user) {
            user.roles.push(role._id);
            return user.save();
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async getUserById(id) {
        return this.userModel.findById(id).exec();
    }

    async getRoles(_id) {
        return this.rolesService.getRolesById(_id);
    }

    private async ParseRole(user: UserDocument) {
        const roles = await Promise.all(user.roles.map(role => this.getRoles(role)));
        // @ts-ignore
        return {...user._doc, roles}
    }


    async ban(id: string, banReason: string) {

        const user = await this.userModel.findById(id).exec();

        if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        user.ban = true;
        if(banReason) user.banReason = banReason;
        return user.save();
    }

    async unban(id: string) {
        const user = await this.userModel.findById(id).exec();
        if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        user.ban = false;
        user.banReason = "";
        return user.save();
    }

    async addAdmin(id: string) {

        const user = await this.userModel.findById(id).exec();
        const role = await this.rolesService.getByValue('ADMIN');

        if(user.roles.includes(role._id)) throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);

        if (role && user) {
            user.roles.push(role._id);
            return user.save();
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
}
