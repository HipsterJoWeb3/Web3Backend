
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChapterDocument = Chapter & Document;

@Schema({ collection: 'chapter' })
export class Chapter {
    @Prop({ required: true, type: String })
    value: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({type: Boolean, default: false})
    hidden: boolean;

    @Prop({type: Number, default: 0})
    count: number;

    @Prop({type: Boolean, default: false})
    showPopular: boolean;

    @Prop({type: Boolean, default: false})
    showRecent: boolean;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);