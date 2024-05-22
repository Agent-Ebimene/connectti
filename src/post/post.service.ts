import { Injectable } from "@nestjs/common";
import { CreatePostDto, UpdatePostDto } from "./dto";
import { Prisma, Post } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PostService {
    constructor(
        private readonly prisma: PrismaService,

    ) {
    }

    async createPost(data: CreatePostDto): Promise<Post> {

        const post = await this.prisma.post.create({
            data
        })
        return post
    }
    async getPostById(id: string): Promise<Post> {
        const post = await this.prisma.post.findUnique({
            where: {
                id
            }
        })
        return post
    }
    //Change return value to boolean  later
    async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
        const post = await this.prisma.post.update({
            where: {
                id
            },
            data
        })
        return post
    }

    async deletePost(id: string) {
        await this.prisma.post.delete({
            where: {
                id
            }
        })
    }

}



