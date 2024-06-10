import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma.service";
import { NotitificationService } from "src/notification/notification.service";

@Module({
    imports: [],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService, PrismaService, NotitificationService]
})

export class UserModule { }