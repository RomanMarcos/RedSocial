import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Publication, publicationModel } from './publication.schema';
import { User, userModel } from 'src/user/user.schema';
import { AuthMiddlewareMiddleware } from 'src/auth-middleware/auth-middleware.middleware';
import { UploadMiddlewareMiddleware } from 'src/upload-middleware/upload-middleware.middleware';
const express = require('express');

@Module({
  imports: [MongooseModule.forFeature([
    { name: Publication.name, schema: publicationModel },
    { name: User.name, schema: userModel }
  ])],
  controllers: [PublicationController],
  providers: [PublicationService]
})
export class PublicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(express.json(), express.urlencoded({ extended: true })).forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(AuthMiddlewareMiddleware).forRoutes('api/newPublication', 'api/removePublication/:id'),
      consumer.apply(UploadMiddlewareMiddleware).forRoutes('api/newPublication')
  }
}
