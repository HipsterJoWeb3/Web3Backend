import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';


@Injectable()
export class FilesService {

    async createAvatarByUsername(username) : Promise<string> {
        try {

            return `https://avatars.dicebear.com/api/jdenticon/${username}.svg`;
        } catch (e) {
            console.log(e)
            throw new HttpException('Error while creating avatar', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async createAvatar(image: any): Promise<string> {
        try {
            const fileName = `${uuid.v4()}.${image.mimetype.split('/')[1]}`;
            const filePath = path.resolve(__dirname, '..', 'static', 'avatars');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), image.buffer);
            return `${process.env.HOST_URL}:${process.env.PORT}/avatars/${fileName}`;
        } catch (e) {
            throw new HttpException('File error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createPostImage(image: any): Promise<string> {
        try {
            const fileName = `${uuid.v4()}.${image.mimetype.split('/')[1]}`;
            const filePath = path.resolve(__dirname, '..', 'static', 'posts');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), image.buffer);
            return `${process.env.HOST_URL}:${process.env.PORT}/posts/${fileName}`;
        } catch (e) {
            throw new HttpException('File error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
