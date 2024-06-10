import { Body, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "../users/users.model";
import {LoginUserDto} from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async login(@Body() userDto: LoginUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(@Body() userDto: CreateUserDto){
        const candidate = await this.userService.getUsersByLogin(userDto.email);
        if(candidate){
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateToken(user: User){
        const payload = {login: user.email, id: user.id}
        return{
            token: this.jwtService.sign(payload)

        }
    }

    private async validateUser(userDto: LoginUserDto){
        const user = await this.userService.getUsersByLogin(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals){

            console.log("bingo")
            return user;
        }
        throw new UnauthorizedException({message: 'Неправильный логин или пароль'})
    }

}