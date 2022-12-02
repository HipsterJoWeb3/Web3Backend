// @ts-ignore
import {IsNotEmpty, IsString} from "class-validator";


export class CreateChapterDto {
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    value: string;

    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    description: string;
    hidden: boolean;
    count?: number;
    showPopular?: boolean;
    showRecent?: boolean;
}