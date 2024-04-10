import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/login')
    login(@Req() request: Request, @Res() response: Response): Promise<object> {
        return this.userService.login(request, response);
    }

    @Post('/signup')
    signup(@Req() request: Request, @Res() response: Response): Promise<object> {
        return this.userService.signup(request, response);
    }

    @Get('/users/:id')
    getUsers(@Req() request: Request, @Res() response: Response): Promise<object>{
        return this.userService.getUsers(request, response);
    }

    @Get('/profile/:id')
    profile(@Req() request: Request, @Res() response: Response): Promise<object>{
        return this.userService.profile(request, response);
    }

    @Post('/followUser/:userId')
    followUser(@Req() request: Request, @Res() response: Response): Promise<object>{
        return this.userService.followUser(request, response);
    }

    @Post('unFollowUser/:userId')
    unFollowUser(@Req() request: Request, @Res() response: Response): Promise<object>{
        return this.userService.unFollowUser(request, response);
    }

}
