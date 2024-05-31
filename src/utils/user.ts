import { BadRequestException } from "@nestjs/common";
import { isEmail } from 'class-validator';




export const passwordPattern = /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?]{6}$/;

const validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isValidEmail = (email: string): boolean => {
    if (validEmailPattern.test(email)) {
        return true;
    }
};