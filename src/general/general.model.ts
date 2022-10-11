
import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

class Links {
    @Prop({ type: String})
    value: string;
    @Prop({ type: String })
    url: string;
}

class PagesOrder {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'pages' })
    value: string;
    @Prop({ type: Number })
    index: number;
}

export type GeneralDocument = General & Document;

@Schema({ collection: 'general' })
export class General {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String })
    subtitle: string;

    @Prop({required: true, type: mongoose.Schema.Types.Array})
    links: Links[];

    @Prop({required: true, type: mongoose.Schema.Types.Array})
    pagesOrder: PagesOrder[];

}

export const GeneralSchema = SchemaFactory.createForClass(General);