import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register() {

    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByUsername(dto.username);
        const isPasswordMatching = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        };

        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return {
            access_token,
            payload
        };
    }

    async validateUser(username, password): Promise<any> {

    }
}