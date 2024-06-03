import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [],
    controllers: [LikeController],
    providers: [LikeService, PrismaService]
})
export class LikeModule {

}