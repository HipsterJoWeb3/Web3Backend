
// @ts-ignore
import {IsNotEmpty, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly username: string;

    @IsString({message: 'Must be a string'})
    @Length(8, 16, {message: 'Must be between 8 and 16 characters'})
    readonly password: string;

    readonly imageUrl: string;
}