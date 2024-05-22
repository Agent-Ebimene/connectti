import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Comment, Prisma } from "@prisma/client";


@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService) { }

    async createCommentOnPost(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: data.userId
            }
        })
        const postExits = await this.prisma.post.findUnique({
            where: {
                id: data.postId
            }
        })
        if (!userExists) {
            throw new Error('User not found!')
        }
        if (!postExits) throw new Error("Post not found!")
        const comment = await this.prisma.comment.create({
            data
        })
        return comment
    }

}