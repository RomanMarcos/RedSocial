import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel } from './user.schema';
import { Publication, publicationModel } from 'src/publication/publication.schema';
import { AuthMiddlewareMiddleware } from 'src/auth-middleware/auth-middleware.middleware';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: userModel },
    { name: Publication.name, schema: publicationModel}
  ])],
  controllers: [UserController],
  providers: [UserService]
})

export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlewareMiddleware).forRoutes('api/users/:id', 'api/profile/:id', 'api/followUser/:userId', 'api/unFollowUser/:userId')
  }
}