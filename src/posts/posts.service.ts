import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dtos/create-post.dto";
import {FilesService} from "../files/files.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Posts, PostsDocument} from "./posts.model";
import {UserService} from "../user/user.service";
import {TagsService} from "../tags/tags.service";
import {ChaptersService} from "../chapters/chapters.service";



@Injectable()
export class PostsService {

    constructor(
        private fileService: FilesService,
        private userService: UserService,
        private tagsService: TagsService,
        private chapterService: ChaptersService,
        @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
    ) {}


    async create(dto: CreatePostDto, image) {
        const chapter = await this.chapterService.getByValue(dto.chapter);
        if(!chapter) throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);
        const fileName = image ? await this.fileService.createPostImage(image) : dto.imageUrl
        const tags = await this.tagsService.createTags(dto.tags)


        const post = await this.postsModel.create({...dto, imageUrl: fileName, tags, chapter: chapter._id});
        return post.save();
    }

    private async parsePosts(posts) {

        return Promise.all(posts.map(async item => {
            if(item.hidden) return null;
            const user = await this.userService.getUserById(item.userId);
            const tags = await Promise.all(item.tags.map(item => this.tagsService.getTagsById(item.toString())));
            // @ts-ignore
            return {...item._doc, tags, author: user.username}
        }))
    }

    async getPostsByTagName(tag: string, limit: number) {
        const tagFromDb = await this.tagsService.getByName(tag);
        if(!tagFromDb) throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);


        if(tagFromDb.hidden) throw new HttpException('Tag is hidden', HttpStatus.BAD_REQUEST);

        const posts = await this.postsModel.find({tags: tagFromDb._id}).limit(limit).exec();

        const allPosts = await this.parsePosts(posts);
        const filteredPosts = allPosts.filter(item => item !== null);

        return {count: filteredPosts.length, filteredPosts}
    }

    async getAll(limit: number) {
        const posts = await this.postsModel.find().limit(limit).exec();

        const allPosts = await this.parsePosts(posts);

        const filteredPosts = allPosts.filter(item => item !== null);

        return {count: filteredPosts.length, filteredPosts}
    }

    async getById(id: string) {
        const post = await this.postsModel.findById(id)

        if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

        if(post.hidden) throw new HttpException('Post is hidden', HttpStatus.BAD_REQUEST);

        // @ts-ignore
        const tags = await Promise.all(post.tags.map(item => this.tagsService.getTagsById(item.toString())));


        // @ts-ignore
        return {...post._doc, tags};
    }

    async getPostsByChapterValue(value: string, limit: number) {
        const chapter = await this.chapterService.getByValue(value);
        if(!chapter) throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);

        if(chapter.hidden) throw new HttpException('Chapter is hidden', HttpStatus.BAD_REQUEST);
        const posts = await this.postsModel.find({chapter: chapter._id}).limit(limit).exec();

        const allPosts = await this.parsePosts(posts);

        const filteredPosts = allPosts.filter(item => item !== null);

        return {count: filteredPosts.length, filteredPosts}
    }
}
