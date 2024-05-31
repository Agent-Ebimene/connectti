import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Comment, Prisma } from "@prisma/client";
import { UpdateCommentDto } from "./dto";


@Injectable()
export class CommentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

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
        //TODO : Hnadle possible errors
        // const user = await this.prisma.user.findUnique({
        //     where: {
        //         id: comment.userId
        //     }
        // })
        // if (!user) {
        //     throw new Error('You cannot delete a comment you did not create')
        // }
        await this.prisma.comment.delete({
            where: {
                id
            }
        })
    }

    async updateComment(id: string, data: UpdateCommentDto): Promise<Comment> {
        const comment = await this.prisma.comment.findUnique({
            where: { id }
        })
        if (!comment) {
            throw new Error('Comment not found')
        }
        // const user = await this.prisma.user.findUnique({
        //     where: {
        //         id: comment.userId
        //     }
        // })
        // if (!user) {
        //     throw new Error('You cannot update this comment')
        // }
        const updatedComment = await this.prisma.comment.update({
            where: {
                id
            },
            data
        })

        return updatedComment

    }

}