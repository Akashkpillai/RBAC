import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService:UserService){}
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

    async login(loginDto){
            const {email,password} = loginDto
            let user = await this.userService.findUser(loginDto)
            if(!user){
                throw new NotFoundException('No user found')
            }else{
                if(password){
                    const isValid = await bcrypt.compare(password,user.password)
                    if(isValid){
                        return user
                    }else{
                        throw new UnauthorizedException('Invalid password');
                    }
                }
            } 
    }
}
