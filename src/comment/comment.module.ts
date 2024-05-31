import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PrismaService } from "src/prisma.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [UserModule],
    controllers: [CommentController],
    providers: [CommentService, PrismaService]
})
export class CommentModule { }