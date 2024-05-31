import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Prisma } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { UpdateCommentDto } from "./dto/update-comment.dto";
Prisma

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,

    ) { }
    @Get('/:id')
    async getUserComments(@Param('id') id: string) {
        return this.commentService.getUserComments(id)
    }

    @Post('/create/')
    async createComment(@Body() data: Prisma.CommentUncheckedCreateInput) {
        return this.commentService.createCommentOnPost(data)
    }
    @Put('/update/:id')
    async updateComment(@Body() data: UpdateCommentDto, @Param('id') id: string) {
        return this.commentService.updateComment(id, data)
    }
    @Delete('/delete/:id')
    async deleteUserComment(@Param('id') id: string) {
        return this.commentService.deleteUserComment(id)

    }



}