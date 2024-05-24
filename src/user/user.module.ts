import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService, PrismaService]
})

export class UserModule { }