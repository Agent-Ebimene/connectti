import { Module } from "@nestjs/common";
import { NotitificationService } from "./notification.service";
import { PrismaService } from "src/prisma.service";

@Module({
    providers: [NotitificationService, PrismaService]

})
export class NotitificationModule { }