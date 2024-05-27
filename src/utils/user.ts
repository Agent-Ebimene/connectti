import { BadRequestException } from "@nestjs/common";
import { isEmail } from 'class-validator';




export const passwordPattern = /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?]{6}$/;

export function validateEmail(email: string) {
    if (typeof email !== 'string') {
        throw new BadRequestException(`Bad email format: ${email || '<unknown>'}`);
    } else if (!isEmail(email)) {
        throw new BadRequestException('Incorrect email format');
    }
}