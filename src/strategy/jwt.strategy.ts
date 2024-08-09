import { jwtInterface } from './../interface/jwt.interface';
import { Injectable } from "@nestjs/common";
import {  PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            secretOrKey:process.env.jwt,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payLoad:jwtInterface){
        return {_id   : payLoad._id }
    }
}