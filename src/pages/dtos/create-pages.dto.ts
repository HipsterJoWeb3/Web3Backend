// @ts-ignore
import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreatePagesDto {
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly value: string;

    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly description: string;

    @IsString({message: 'Must be a string'})
    readonly route: string;


    readonly content: object;
}