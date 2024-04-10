import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { Publication } from 'src/publication/publication.schema';

const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Publication.name) private publicationModel: Model<Publication>
    ) { }

    async login(@Req() request: Request, @Res() response: Response): Promise<object> {
        try {
            const { email, password } = request.body;

            const user = await this.userModel.find({ email: email });

            if (user.length === 0) {
                return response.status(401).json({ error: 'Invalid credentials' });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

            if (!isPasswordCorrect) {
                return response.status(401).json({ error: `The password isn't correct. Please try again` });
            }

            const { token } = jwt.createToken(user);

            return response.status(200).json({
                status: 'Success',
                token: token,
                user: user
            })
        } catch (error) {
            response.status(500).json({ error: `Internal server error: ${error}` });
        }
    }

    async signup(@Req() request: Request, @Res() response: Response): Promise<object> {
        try {
            const { username, email, password } = request.body;

            const user = await this.userModel.find({ email: email.toLowerCase() });

            if (user.length > 0) {
                return response.status(400).json({
                    status: 'The email is already in used'
                })
            }

            const { token } = jwt.createToken(user);
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new this.userModel({ username, email, password: hashedPassword });

            newUser.save()
                .then(() => {
                    return response.status(200).json({
                        status: 'User created successfully',
                        token: token,
                        user: newUser
                    });
                })
                .catch((error) => {
                    console.log(`There was an error: ${error}`);
                    throw new Error();
                });
        } catch (error) {
            response.status(500).json({ error: `Internal server error: ${error}` });
        }
    }

    async getUsers(@Req() request: Request, @Res() response: Response): Promise<object> {
        try {

            const { id } = request.params;

            const user = await this.userModel.findById(id);

            if (!user) {
                return response.status(404).json({
                    status: 'Error',
                    message: 'The user does not exist'
                });
            }

            const excludedIds = user.follows.map((element) => {
                return element.userId
            })

            const filteredArray = excludedIds.filter((elemento, indice, excludedIds) => {
                return excludedIds.indexOf(elemento) === indice;
            });

            const usersToFollow = await this.userModel.find({ email: { $ne: user.email }, _id: { $nin: filteredArray } });
            const followedUsers = await this.userModel.find({ email: { $ne: user.email }, _id: { $in: filteredArray } });

            return response.status(200).json({
                status: 'Success',
                usersToFollow,
                followedUsers
            });

        } catch (error) {
            return response.status(500).json({
                status: 'Error',
                message: `There was an error trying to get the user: ${error}`
            });
        }
    }

    async profile(@Req() request: Request, @Res() response: Response): Promise<object> {

        try {
            const { id } = request.params;
            const user = await this.userModel.findById(id);

            if (!user) {
                return response.status(404).json({
                    status: 'Error',
                    message: 'The user does not exist'
                });
            }

            const followedUsersId = user.follows.map((element) => {
                return element.userId
            })

            const filteredArray = followedUsersId.filter((elemento, indice, followedUsersId) => {
                return followedUsersId.indexOf(elemento) === indice;
            });

            const userPublications = await this.publicationModel
                .find({ $or: [{ userId: id }, { userId: { $in: filteredArray } }] })
                .sort({ created_at: -1 });

            return response.status(200).json({
                status: 'Success',
                user,
                publications: userPublications
            });

        } catch (error) {
            return response.status(500).json({
                status: 'Error',
                message: 'There was an error trying to get the user by ID'
            });
        }
    }

    async followUser(@Req() request: Request, @Res() response: Response): Promise<object>{
        try {
            const { userId } = request.params; // This ID is of the user that is dispatching the action of follow to another user
            const { id } = request.body; // This ID is the one related to the user that will be followed
    
            await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { follows: { userId: id } } })
            .then((userToUpdate) => {
                return response.status(200).json({
                    status: 'Success',
                    message: 'User updated successfully'
                });
            })
            .catch(() => {
                return response.status(404).json({
                    status: 'Error',
                    message: `User not found..`
                });
            });
    
        } catch(error) {
            return response.status(500).json({
                status: 'Error',
                message: `There was an error trying to follow the new user: ${error}`
            });
        }
    }

    async unFollowUser(@Req() request: Request, @Res() response: Response): Promise<object>{
        try {
            const { userId } = request.params; // This ID is of the user that is dispatching the action of un-follow to another user
            const { id } = request.body; // This ID is the one related to the user that will be un-followed
    
            await this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { follows: { userId: id } } })
            .then((userToUpdate) => {
                return response.status(200).json({
                    status: 'Success',
                    message: 'User updated successfully'
                });
            })
            .catch(() => {
                return response.status(404).json({
                    status: 'Error',
                    message: `User not found..`
                });
            });
    
        } catch(error) {
            return response.status(500).json({
                status: 'Error',
                message: `There was an error trying to follow the new user: ${error}`
            });
        }
    }

}
