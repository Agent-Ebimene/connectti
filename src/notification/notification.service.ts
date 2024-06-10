import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateNotificationDto } from "./dto";
import { Notification } from "@prisma/client";

@Injectable()
export class NotitificationService {
    constructor(private readonly prisma: PrismaService) { }
    async createNotification(userId: string, data: CreateNotificationDto): Promise<Notification> {
        return this.prisma.notification.create({
            data: {
                userId,
                message: data.message,
                type: data.type
            }

        })
    }
    async getUserNotifications(userId: string): Promise<Notification[]> {

        const userNotifications = await this.prisma.notification.findMany({
            where: {
                userId
            }
        })
        return userNotifications
    }
    async getNotification(id: string) {

        let notification = await this.prisma.notification.findUnique({
            where: {
                id
            }
        })
        if (notification) {
            notification = await this.prisma.notification.update({
                where: {
                    id
                },
                data: {
                    ...notification,
                    read: true
                }
            })
        }


        return notification

    }

}