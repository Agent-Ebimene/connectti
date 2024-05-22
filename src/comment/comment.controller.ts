import { Body, Controller, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Prisma } from "@prisma/client";
Prisma

@Controller()
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post('user/create/comment')
    async createComment(@Body() data: Prisma.CommentUncheckedCreateInput) {
        return this.commentService.createCommentOnPost(data)
    }

}