import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { PrismaService } from "src/prisma.service";
import { NotitificationService } from "src/notification/notification.service";

@Module({
    imports: [],
    controllers: [LikeController],
    providers: [LikeService, PrismaService, NotitificationService]
})
export class LikeModule {

}