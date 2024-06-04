import { Injectable } from "@nestjs/common";
import { Like, Prisma, User } from "@prisma/client";
import { NotitificationService } from "src/notification/notification.service";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class LikeService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly notificationService: NotitificationService

    ) { }

    async likePost(data: Prisma.LikeUncheckedCreateInput): Promise<Like> {

        const existingLike = await this.prisma.like.findUnique({
            where: {
                postId_userId: {
                    postId: data.postId,
                    userId: data.userId
                }
            }
        })
        if (existingLike) {
            throw new Error('User has liked this post already')

        }

        const like = await this.prisma.like.create({
            data
        })

        const post = await this.prisma.post.findUnique({
            where: {
                id: data.postId
            },

        })
        if (post) {
            await this.notificationService.createNotification(post.authorId, { message: "You have a like on your post", type: "Like" })
        }
        return like
    }

    async unlikePost(postId: string, userId: string) {
        return this.prisma.like.delete({
            where: {
                postId_userId: {
                    postId,
                    userId
                }
            }
        })

    }
    async getPostLikes(id: string): Promise<User[]> {
        const results = await this.prisma.post.findUnique({
            where: {
                id
            },
            include: {
                likes: {
                    include: {
                        user: true
                    }
                }

            }
        })
        const usersWhoLikedPost = results.likes.map((user) => user.user)

        return usersWhoLikedPost
    }
}