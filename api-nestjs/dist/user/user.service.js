"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const publication_schema_1 = require("../publication/publication.schema");
const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');
let UserService = class UserService {
    constructor(userModel, publicationModel) {
        this.userModel = userModel;
        this.publicationModel = publicationModel;
    }
    async login(request, response) {
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
            });
        }
        catch (error) {
            response.status(500).json({ error: `Internal server error: ${error}` });
        }
    }
    async signup(request, response) {
        try {
            const { username, email, password } = request.body;
            const user = await this.userModel.find({ email: email.toLowerCase() });
            if (user.length > 0) {
                return response.status(400).json({
                    status: 'The email is already in used'
                });
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
        }
        catch (error) {
            response.status(500).json({ error: `Internal server error: ${error}` });
        }
    }
    async getUsers(request, response) {
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
                return element.userId;
            });
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
        }
        catch (error) {
            return response.status(500).json({
                status: 'Error',
                message: `There was an error trying to get the user: ${error}`
            });
        }
    }
    async profile(request, response) {
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
                return element.userId;
            });
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
        }
        catch (error) {
            return response.status(500).json({
                status: 'Error',
                message: 'There was an error trying to get the user by ID'
            });
        }
    }
    async followUser(request, response) {
        try {
            const { userId } = request.params;
            const { id } = request.body;
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
        }
        catch (error) {
            return response.status(500).json({
                status: 'Error',
                message: `There was an error trying to follow the new user: ${error}`
            });
        }
    }
    async unFollowUser(request, response) {
        try {
            const { userId } = request.params;
            const { id } = request.body;
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
        }
        catch (error) {
            return response.status(500).json({
                status: 'Error',
                message: `There was an error trying to follow the new user: ${error}`
            });
        }
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "login", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "signup", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getUsers", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "profile", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "followUser", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "unFollowUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(publication_schema_1.Publication.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map