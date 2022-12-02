
import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as uuid from 'uuid';

class Links {
    @Prop({ type: String})
    value: string;
    @Prop({ type: String })
    url: string;
    @Prop({type: String})
    _id: string;
}

class PagesOrder {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'pages' })
    value: string;
    @Prop({ type: Number })
    index: number;
}

class SomeInformation {
    @Prop({type: String})
    title: string;
    @Prop({type: String})
    subtitle: string;
    @Prop({type: String})
    imageUrl: string;
    @Prop({type: Boolean})
    hidden: boolean;
    @Prop({type: String})
    _id: string;
}

class AnimationText {
    @Prop({type: String})
    label: string;
    @Prop({type: String})
    text: string;
    @Prop({type: Number})
    duration: number;
    @Prop({type: Boolean})
    hidden: boolean;
    @Prop({type: String})
    _id: string;
}

export type GeneralDocument = General & Document;

@Schema({ collection: 'general' })
export class General {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String })
    subtitle: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ required: true, type: [String] })
    keywords: string[];

    @Prop({ required: true, type: mongoose.Schema.Types.Array })
    animationLinks: Links[];

    @Prop({required: true, type: mongoose.Schema.Types.Array})
    someInformation: SomeInformation[];

    @Prop({required: true, type: mongoose.Schema.Types.Array})
    animationText: AnimationText[];


    @Prop({required: true, type: mongoose.Schema.Types.Array})
    links: Links[];


}

export const GeneralSchema = SchemaFactory.createForClass(General);