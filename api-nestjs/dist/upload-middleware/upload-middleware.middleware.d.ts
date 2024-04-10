import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class UploadMiddlewareMiddleware implements NestMiddleware {
    use(next: NextFunction): void;
}
