import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PrismaService } from "src/prisma.service";
import { UserModule } from "src/user/user.module";
import { NotitificationService } from "src/notification/notification.service";

@Module({
    imports: [UserModule],
    controllers: [CommentController],
    providers: [CommentService, PrismaService, NotitificationService]
})
export class CommentModule { }