import { IsEmail, IsString, IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @Exclude()
    password: string;

    @Exclude()
    salt: string;

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
    role: Role;
}