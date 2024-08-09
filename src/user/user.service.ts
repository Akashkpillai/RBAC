import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { userDto } from 'src/DTO/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModule:Model<User>){}

    async create(userDto:userDto):Promise<User>{
        const user = new this.userModule(userDto)
        return user.save()
    }

    async findUser(options):Promise<User>{
        const {email,password} = options
        const user = await this.userModule.findOne({email})
        return user
    }

    async findUserById(id):Promise<Partial<User>>{
        let user = await this.userModule.findById(id)
        let {password,...result} = user.toObject()
        return result
    }
}
