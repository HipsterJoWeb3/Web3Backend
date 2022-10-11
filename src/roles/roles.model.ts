
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RolesDocument = Roles & Document;

@Schema({ collection: 'roles' })
export class Roles {
    @Prop({ required: true, unique: true, type: String })
    value: string;

    @Prop({ required: true, type: String })
    description: string;

}

export const RolesSchema = SchemaFactory.createForClass(Roles);