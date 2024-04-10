import { Request, Response } from 'express';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(request: Request, response: Response): Promise<object>;
    signup(request: Request, response: Response): Promise<object>;
    getUsers(request: Request, response: Response): Promise<object>;
    profile(request: Request, response: Response): Promise<object>;
    followUser(request: Request, response: Response): Promise<object>;
    unFollowUser(request: Request, response: Response): Promise<object>;
}
