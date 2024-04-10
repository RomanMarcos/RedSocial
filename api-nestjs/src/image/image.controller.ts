import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ImageService } from './image.service';

@Controller('api')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @Get('/image/:file')
    image(@Req() request: Request, @Res() response: Response) {
        this.imageService.image(request, response);
    }
    
}
