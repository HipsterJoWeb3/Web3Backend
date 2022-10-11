// @ts-ignore
import {IsNotEmpty, IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly value: string;

    @IsNotEmpty({message: 'Must not be empty'})
    readonly userId: number;
}