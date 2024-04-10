import { Injectable } from '@nestjs/common';
const fs = require('fs');
const path = require('path');

@Injectable()
export class ImageService {

    image(req, res): void {
        let file = req.params.file;
        let localPath = `./images/${file}`;
    
        fs.stat(localPath, (error, exist) => {
            if (exist) {
                return res.sendFile(path.resolve(localPath));
            } else {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The image does not exist..'
                });
            }
        });
    }

}
