import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dtos/create-post.dto";
import {FilesService} from "../files/files.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Posts, PostsDocument} from "./posts.model";
import {UserService} from "../user/user.service";
import {TagsService} from "../tags/tags.service";
import {ChaptersService} from "../chapters/chapters.service";
import {JwtService} from "@nestjs/jwt";



@Injectable()
export class PostsService {

    constructor(
        private fileService: FilesService,
        private userService: UserService,
        private tagsService: TagsService,
        private chapterService: ChaptersService,
        private jwtService: JwtService,
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


            const {text, ...post} = item._doc;



            const user = await this.userService.getUserById(post.userId);
            const tags = await Promise.all(post.tags.map(item => this.tagsService.getTagsById(item.toString())));
            // @ts-ignore
            return {...post, tags, author: user}
        }))
    }

    async getPostsByTagName(tag: string, limit: number) {
        const tagFromDb = await this.tagsService.getByName(tag);
        if(!tagFromDb) throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);


        if(tagFromDb.hidden) throw new HttpException('Tag is hidden', HttpStatus.BAD_REQUEST);

        const posts = await this.postsModel.find({tags: tagFromDb._id}).limit(limit).exec();

        const allPosts = await this.parsePosts( posts);
        const filteredPosts = allPosts.filter(item => item !== null);

        return {count: filteredPosts.length, filteredPosts}
    }

    async getAll(limit: number, chapter: string, tag: string, author: string, offset: number, type: string, search: string) {

        try {
            const query = {};
            let sort = {};


            if(chapter) {
                query['chapter'] = chapter;
            }


            if(author) {
                const user = await this.userService.getUserByUsername(author);
                if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
                query['userId'] = user._id;
            }

            if(search) {
                query['title'] = { '$regex' : search, '$options' : 'i' }
            }


            if(type) {
                if(type === 'popular') {
                    sort['views'] = -1
                } else if(type === 'recent') {
                    sort['createdAt'] = -1
                }
            }

            if(tag) {
                const tagFromDb = await this.tagsService.getByName(tag);
                if(!tagFromDb) throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
                query['tags'] = tagFromDb._id;
            }


            const posts = await this.postsModel.find(query).sort(sort).limit(limit*1).skip((offset - 1) * limit).exec();
            const totalCount = await this.postsModel.countDocuments(query).exec();


            const allPosts = await this.parsePosts(posts);


            return {count: allPosts.length, totalCount,  filteredPosts: allPosts }
        } catch(e) {
            throw new HttpException('Posts not found', HttpStatus.NOT_FOUND);
        }

    }

    async getById(id: string) {
        const post = await this.postsModel.findById(id)

        if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);


        // @ts-ignore
        const tags = await Promise.all(post.tags.map(item => this.tagsService.getTagsById(item.toString())));
        const user = await this.userService.getUserById(post.userId);
        const chapter = await this.chapterService.getById(post.chapter.toString());


        // @ts-ignore
        return {...post._doc, tags, author: user, chapter};
    }

    async getPostsByChapterValue(value: string, limit: number) {
        const chapter = await this.chapterService.getByValue(value);
        if(!chapter) throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);

        const posts = await this.postsModel.find({chapter: chapter._id}).limit(limit).exec();

        const allPosts = await this.parsePosts( posts);

        const filteredPosts = allPosts.filter(item => item !== null);

        return {count: filteredPosts.length, filteredPosts}
    }

    async delete(id: string) {
        return this.postsModel.findByIdAndDelete(id);
    }

    async uploadImage(image: any) {
        const url = await this.fileService.createPostImage(image);

        return {success: 1, file: [url]}
    }

    async hidePost(id: string, hidden: boolean) {
        const post = await this.postsModel.findById(id);
        if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

        post.hidden = hidden
        return post.save();
    }

    async updatePost(id: string, dto: CreatePostDto) {


        const post: any = await this.postsModel.findById(id);
        if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

        // const chapter = await this.chapterService.getByValue(dto.chapter);
        // if(!chapter) throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);

        post.title = dto.title;
        post.description = dto.description;
        post.text = dto.text;
        // post.chapter = chapter._id;
        post.imageUrl = dto.imageUrl;
        const tags = await this.tagsService.createTags(dto.tags);
        post.tags = tags.map(item => item.toString())

        await post.save();
        const user = await this.userService.getUserById(post.userId);
        const returnTags = await Promise.all(post.tags.map(item => this.tagsService.getTagsById(item.toString())));

        // @ts-ignore
        return {...post._doc, tags: returnTags, author: user}

    }

    async uploadPreview(image: string) {
        return this.fileService.createPostImage(image);
    }

    async getCountPostsByChapter(chapter: string) {
        const postsCount = await this.postsModel.countDocuments({chapter});
        return postsCount;
    }
}
