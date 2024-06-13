import { Injectable } from "@nestjs/common";
import { CreatePostDto, UpdatePostDto } from "./dto";
import { Post, Comment } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class PostService {
    constructor(
        private readonly prisma: PrismaService,

    ) {
    }

    async createPost(data: Prisma.PostUncheckedCreateInput): Promise<Post> {

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
    // TODO: Implement a getAllPosts with limit and pagination

    async getAllPostComments(postId: string): Promise<Comment[]> {
        const allComments = await this.prisma.comment.findMany({
            where: {
                postId
            }
        })
        return allComments

    }

    async getAllPosts(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany()
        if (!posts) {
            throw new Error('Error Fetching data')
        }
        return posts
    }
}



