import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PostService } from "./post.service";
import { UpdatePostDto } from "./dto";
import { Public } from "src/decorators/public.decorator";

@Controller('')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get('/post/:id')
    async getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id)
    }

    @Get('/post/:id/comments')
    async getAllPostComments(@Param('id') id: string) {
        return this.postService.getAllPostComments(id)

    }

    @Get('/posts')
    async getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Public()
    @Post('/post/create')
    async createPost(@Body() data: Prisma.PostCreateInput) {
        return this.postService.createPost(data)
    }

    @Put('/post/:id')
    async updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
        return this.postService.updatePost(id, data)
    }

    @Delete('post/:id/delete')
    async deletePost(@Param('id') id: string) {
        return this.postService.deletePost(id)
    }

}