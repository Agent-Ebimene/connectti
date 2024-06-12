import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.gaurd";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { CreateUserDto } from "src/user/dto";
import { Public } from "src/decorators/public.decorator";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Request() req) {
        return this.authService.loginUser(req.user);
    }
    @Public()
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