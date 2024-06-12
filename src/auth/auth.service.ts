import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/user/dto";
import { PrismaService } from "src/prisma.service";
import { passwordPattern, isValidEmail } from "src/utils/user";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService

    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.userService.getUserByEmail(email)
        if (!user) {
            throw new UnauthorizedException('Incorrect email address!');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Incorrect password!')
        }

        if (user && isPasswordValid) {
            const { password, ...result } = user

            return result

        }
        return null
    }

    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
    async registerUser(user: CreateUserDto) {
        const hash = await this.hashPassword(user.password)
        const users = await this.prisma.user.findMany();
        const isUserExisting = users.find(({ email }) => email === user.email)
        if (isUserExisting) {
            throw new Error('This user already exists!');
        }
        if (!passwordPattern.test(user.password)) {
            throw new Error('Password must be exactly 6 characters long and contain at least one special character')
        }
        // TODO : handle email validation in nestjs way


        return this.prisma.user.create({
            data: {
                ...user,
                password: hash
            }
        })

    }
    async loginUser(user: User) {
        const payload = {
            username: user.email,
            sub: user.id
        }

        return {
            access_token: this.jwtService.sign(payload)
        }

    }

}