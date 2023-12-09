import { Reflector } from "@nestjs/core";
import { UserDto } from "../data-access/users";

export const Roles = Reflector.createDecorator<UserDto["role"][]>();