import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { LikeService } from "./like.service";
import { Like, User } from "@prisma/client";
import { CreateLikeDto } from "./dto";


@Controller()
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) { }

    @Get('likes/:id')
    async getPostLikes(@Param('id') id: string): Promise<User[]> {
        return this.likeService.getPostLikes(id)

    }
    @Post('like')
    async likePost(@Body() data: CreateLikeDto): Promise<Like> {
        return this.likeService.likePost(data)

    }

    @Delete('unlike')
    async unlikePost(@Body() data: CreateLikeDto) {

        this.likeService.unlikePost(data.postId, data.userId)
    }

}