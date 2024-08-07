import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({isRequired:true})
    name:string

    @Prop({unique:[true,"Duplicate Email"]})
    email:string

    @Prop()
    password:string

    @Prop()
    role:string
}

export const UserSchema = SchemaFactory.createForClass(User)