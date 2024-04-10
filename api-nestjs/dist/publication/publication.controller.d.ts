import { Request, Response } from 'express';
import { PublicationService } from './publication.service';
export declare class PublicationController {
    private publicationService;
    constructor(publicationService: PublicationService);
    newPublication(request: Request, response: Response): Promise<object>;
    removePublication(request: Request, response: Response): Promise<object>;
}
