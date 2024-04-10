import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PublicationDocument = HydratedDocument<Publication>;

@Schema()
export class Publication {

    @Prop({ required: true})
    userId: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    image: string;

    @Prop({ default: Date.now })
    created_at: Date;

}

export const publicationModel = SchemaFactory.createForClass(Publication);