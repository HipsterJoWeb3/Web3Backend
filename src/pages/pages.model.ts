


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PagesDocument = Pages & Document;

@Schema({ collection: 'pages' })
export class Pages {
    @Prop({ type: String, required: true, unique: true })
    value: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Object, required: true })
    content: object;

    @Prop({type: String, required: true})
    route: string;

    @Prop({ type: Boolean, default: false })
    hidden: boolean;

}

export const PagesSchema = SchemaFactory.createForClass(Pages);