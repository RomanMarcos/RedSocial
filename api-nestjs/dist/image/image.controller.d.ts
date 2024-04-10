import { Request, Response } from 'express';
import { ImageService } from './image.service';
export declare class ImageController {
    private imageService;
    constructor(imageService: ImageService);
    image(request: Request, response: Response): void;
}
