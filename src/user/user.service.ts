import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { User, Post, Comment } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { NotitificationService } from "src/notification/notification.service";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,


    ) {

    }
    async getAllUsers(): Promise<User[]> {
        try {

            const users = await this.prisma.user.findMany()
            return users
        } catch (err) {
            throw new Error('Error fetching users')
        }

    }

    async getUserById(id: string): Promise<User> {

        const user = this.prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) {
            throw new Error('There is no user with this id')
        }
        return user
    }

    async getUserByEmail(email: string): Promise<User> {

        const user = await this.prisma.user.findUnique({
            where: {
                email
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
        if (!user) {
            throw new Error('This user does not exist')
        }

    }
    //TODO  : MOVE THIS METHOD TO POST SERVICE
    async getAllPostsByUser(userId: string): Promise<Post[]> {
        const results = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: true
            }
        })

        return results.posts
    }
    async getUserComments(id: string): Promise<Comment[]> {
        const results = await this.prisma.user.findUnique({
            where: { id },
            include: {
                comments: true,
            }
        })
        return results.comments
    }
    async deleteUserComment(id: string): Promise<void> {
        const comment = await this.prisma.comment.findUnique({
            where: {
                id
            }
        })
        if (!comment) {
            throw new Error('Comment not found!')
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: comment.userId
            }
        })
        if (!user) {
            throw new Error('You cannot delete a comment you did not create')
        }
        await this.prisma.comment.delete({
            where: {
                id
            }
        })
    }

}