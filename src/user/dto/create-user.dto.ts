import { IsEmail } from 'class-validator';

export class CreateUserDto {
    firstName: string;
    lastName: string;
    description: string;
    @IsEmail()
    email: string;
    createdAt: Date
    updatedAt: Date
    lastActive: Date
    dateOfBirth: Date;
    password: string
}