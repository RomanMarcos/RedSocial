import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PublicationService } from './publication.service';

@Controller('api')
export class PublicationController {
    constructor(private publicationService: PublicationService) {}

    @Post('/newPublication')
    newPublication(@Req() request: Request, @Res() response: Response): Promise<object> {
        return this.publicationService.newPublication(request, response);
    }

    @Post('/removePublication/:id')
    removePublication(@Req() request: Request, @Res() response: Response): Promise<object> {
        return this.publicationService.removePublication(request, response);
    }

}
