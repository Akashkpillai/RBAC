import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, MinLength, min } from "class-validator";

export class userDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @IsEmail({},{message:"Please enter a valid mail"})
    email:string

    @IsNotEmpty()
    role:string

    @IsNotEmpty()
    @MinLength(6)
    password:string

}