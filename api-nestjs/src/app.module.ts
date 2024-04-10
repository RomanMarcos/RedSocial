import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PublicationModule } from './publication/publication.module';
import { ImageModule } from './image/image.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, PublicationModule, ImageModule, MongooseModule.forRoot('mongodb://mongodb:27017/redSocial') ]
})
export class AppModule {}
