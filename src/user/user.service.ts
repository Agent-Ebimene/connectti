import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {

    }
    async getAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany()
        return users

    }
    async createUser(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data
        })

    }
    async getUser(id: string): Promise<User> {

        const user = this.prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }

    async updateUser(id: string, data: UpdateUserDto): Promise<User> {
        const user = this.prisma.user.update({
            where: {
                id
            },
            data
        })
        return user
    }
    async deleteUser(id: string) {
        const user = await this.prisma.user.delete({
            where: {
                id
            }
        })

    }
}