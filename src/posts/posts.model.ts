


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {User} from "../user/user.model";
import {Tags} from "../tags/tags.model";
import {Chapter} from "../chapters/chapters.model";

export type PostsDocument = Posts & Document;

@Schema({ collection: 'posts', timestamps: true })
export class Posts {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ required: true, type: Object })
    text: object;

    @Prop({ type: String })
    imageUrl: string;

    @Prop({ type: Number, default: 0 })
    views: number;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    userId: User;

    @Prop({  type: [mongoose.Schema.Types.ObjectId], ref: 'tags' })
    tags: Tags[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'chapter'})
    chapter: Chapter;

    @Prop({type: Boolean, default: false})
    hidden: boolean;

}

export const PostsSchema = SchemaFactory.createForClass(Posts);