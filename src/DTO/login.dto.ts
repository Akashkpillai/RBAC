import { IsEmail,IsNotEmpty, MinLength } from "class-validator";

export class loginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @MinLength(6)
    password:string
}