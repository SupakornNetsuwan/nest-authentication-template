import { Reflector } from "@nestjs/core";
import { RoleTypes } from "core/types";

export const Roles = Reflector.createDecorator<RoleTypes[]>();
