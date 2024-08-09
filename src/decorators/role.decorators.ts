import { SetMetadata } from "@nestjs/common"
import { Role } from "src/enum/roles.enum"

export const ROLE_KEYS = 'role'
export const Roles = (role:string[]) => SetMetadata(ROLE_KEYS,role)