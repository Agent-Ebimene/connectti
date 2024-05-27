import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@Controller('')
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
        return this.userService.getUserById(id)
    }
    //TODO: change this route later
    @Get('/user/:email')
    async getUserByEmail(@Param('email') email: string) {
        return this.userService.getUserByEmail(email)
    }
    @Get('user/:id/posts')
    async getAllPostsByUser(@Param('id') id: string) {
        return this.userService.getAllPostsByUser(id)

    }

    @Get('/user/:id/comments')
    async getUserComments(@Param('id') id: string) {
        return this.userService.getUserComments(id)
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