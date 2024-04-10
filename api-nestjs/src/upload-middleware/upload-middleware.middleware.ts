import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
const multer = require('multer');


@Injectable()
export class UploadMiddlewareMiddleware implements NestMiddleware {
  use(next: NextFunction) {

    const storage = multer.diskStorage({
        destination: function (file, cb) {
          cb(null, './images/')
        },
        filename: function (file, cb) {
          cb(null, file.originalname)
        }
    });

    multer({ storage: storage });

    next();
  }
}
