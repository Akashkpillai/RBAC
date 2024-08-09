import { Body, ConflictException, Controller, Get, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { userDto } from '../DTO/user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { loginDto } from 'src/DTO/login.dto';
import { promises } from 'dns';
import { JwtGuardsGuard } from './guards/jwt-guards/jwt-guards.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post()
    async singUp(@Body() userDto:userDto ):Promise<User>{
        try {
        const createdUser = await this.authService.singUp(userDto)
        return createdUser
        } catch (error) {
            console.log("This is from user creation",error);
            if(error.code === 11000){
                throw new ConflictException("email alredy exists")
            }
            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }
    @Post('login')
    async login(@Body() loginDto:loginDto):Promise<{jwt:string}>{
        try {
            return await this.authService.login(loginDto) 
        } catch (error) {
            return error.response
        }
    }

    @UseGuards(JwtGuardsGuard)
    @Get('profile')
    async profile(@Req() req){
        return await this.authService.profile(req.user._id)
    }
}
