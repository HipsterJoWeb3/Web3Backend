
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagsDocument = Tags & Document;

@Schema({ collection: 'tags' })
export class Tags {
    @Prop({ type: String, required: true, unique: true })
    value: string;

    @Prop({ type: Boolean, default: false })
    hidden: boolean;


    @Prop({ type: Number, default: 0 })
    views: number;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);