import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User, Prisma } from "@prisma/client";
import { CreateUserDto } from "./dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@Controller('/api/v1')
export class UserController {
    constructor(
        private readonly userService: UserService

    ) { }

    @Get('/users')
    getAllUsers() {
        return this.userService.getAllUsers()
    }
    @Get('users/:id')
    async getUser(@Param('id') id: string) {
        return this.userService.getUser(id)

    }

    @Post("/user/create")
    async createUser(@Body() user: CreateUserDto) {
        this.userService.createUser(user)

    }

    @Put('/user/update/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return this.userService.updateUser(id, data)

    }

    @Delete('user/delete/:id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }

}