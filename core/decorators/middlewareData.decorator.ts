import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const MiddlewareData = createParamDecorator(
    (data: "credential" | "other", context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        return "Some message from param decorator"
    },
);