import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto: CreateUserDto){
        const user: User = await this.userRepository.create(dto);
        return user;
    }

    async getUsersById(id: number){
        const user: User =  await this.userRepository.findOne({where: {id}, include: {all:true}})
        return user;
    }

    async getUsersByLogin(email: string){
        const user: User =  await this.userRepository.findOne({where: {email}, include: {all:true}})
        return user;
    }

    
    async getAllUsers(){
        const users = await this.userRepository.findAll();
        return users;
    }
    
}
