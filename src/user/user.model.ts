import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import {Roles} from "../roles/roles.model";

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
    @Prop({ required: true, unique: true, type: String })
    username: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ type: String })
    imageUrl: string;

    @Prop({  type: String })
    ban: string;

    @Prop({ type: String })
    banReason: string;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'roles'})
    roles: Roles[];


}

export const UserSchema = SchemaFactory.createForClass(User);