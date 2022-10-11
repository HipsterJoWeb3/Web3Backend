// @ts-ignore
import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreatePostDto {
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly title: string;

    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly description: string;

    @IsString({message: 'Must be a string'})
    @MinLength(20, {message: 'Must be at least 20 characters'})
    readonly text: string;

    readonly imageUrl: string;

    readonly userId: string;

    readonly tags: string[];

    readonly chapter: string;
}