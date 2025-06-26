import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";
import { RolesBasedGuard } from "../guard/roles-based.guard";


export function Auth(...roles: [Role]) {
    return applyDecorators(
        SetMetadata(roles, Role),
        UseGuards(JwtAuthGuard, RolesBasedGuard),
    )
}