import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    follows: [
        {
            userId: string;
        }
    ]

    @Prop({ default: Date.now })
    created_at: Date;
}

export const userModel = SchemaFactory.createForClass(User);