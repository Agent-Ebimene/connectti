import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService

    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.userService.getUserByEmail(email)
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user

            return result

        }
        return null
    }
    async login(user: User) {
        const payload = {
            username: user.email,
            sub: user.id
        }

        return {
            access_token: this.jwtService.sign(payload)
        }

    }

}