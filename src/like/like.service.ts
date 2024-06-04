import { Injectable } from "@nestjs/common";
import { Like, Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class LikeService {
    constructor(private readonly prisma: PrismaService) { }

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
                        User: true
                    }
                }

            }
        })
        const usersWhoLikedPost = results.likes.map((user) => user.User)

        return usersWhoLikedPost
    }
}