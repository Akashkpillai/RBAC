import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
        ){}
    async singUp(userDto){
        let {email,password,name,role} = userDto
        const salt = await bcrypt.genSalt();
        let hashPassword = await bcrypt.hash(password,salt)
        let data = {
            email,
            password:hashPassword,
            name,
            role
        }
        const user = await this.userService.create(data);
        return user;
    }

    async login(loginDto):Promise<{jwt:string}>{
            const {email,password} = loginDto
            let user = await this.userService.findUser(loginDto)
            if(!user){
                throw new NotFoundException('No user found')
            }else{
                if(password){
                    const isValid = await bcrypt.compare(password,user.password)
                    if(isValid){
                        let payLoad = {_id:user._id}
                        let jwt = await this.jwtService.signAsync(payLoad)
                        return { jwt }
                    }else{
                        throw new UnauthorizedException('Invalid password');
                    }
                }
            } 
    }
}
