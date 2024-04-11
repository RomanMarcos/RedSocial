import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
const multer = require('multer');


@Injectable()
export class UploadMiddlewareMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '../images/')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
    });

    const upload = multer({ storage: storage });

    upload.single('file');
      
    next();
  }
}
