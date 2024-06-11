import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.gaurd";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { CreateUserDto, LoginUserDto } from "src/user/dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Body() user: LoginUserDto) {
        return this.authService.loginUser(user);
    }
    @Post("/auth/register")
    async createUser(@Body() user: CreateUserDto) {
        return this.authService.registerUser(user)

    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}