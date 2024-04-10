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
exports.PublicationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const publication_schema_1 = require("./publication.schema");
const user_schema_1 = require("../user/user.schema");
const mongoose_2 = require("mongoose");
const fs = require('fs');
let PublicationService = class PublicationService {
    constructor(publicationModel, userModel) {
        this.publicationModel = publicationModel;
        this.userModel = userModel;
    }
    async newPublication(req, res) {
        try {
            const { fileName, content, userId } = req.body;
            if (fileName) {
                let fileplit = fileName.split('\.');
                let extension = fileplit[1];
                if (extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif') {
                    return res.status(400).json({
                        message: "Invalid file"
                    });
                }
            }
            const user = await this.userModel.findById(userId);
            if (!user) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The user does not exist'
                });
            }
            const newPublication = new this.publicationModel({ userId, author: user.username, description: content, image: fileName });
            newPublication.save()
                .then(() => {
                return res.status(200).json({
                    status: 'Publication dreated successfully',
                    user: user,
                    publication: newPublication
                });
            })
                .catch((error) => {
                console.log(`There was an error: ${error}`);
                throw new Error();
            });
        }
        catch (error) {
            return res.status(500).json({
                status: `Error -> ${error}`
            });
        }
    }
    async removePublication(req, res) {
        try {
            const { id } = req.params;
            this.publicationModel.deleteOne({ _id: id })
                .then(() => {
                return res.status(200).json({
                    status: 'Success',
                    message: 'The publication was successfully removed from the database..'
                });
            })
                .catch(() => {
                return res.status(404).json({
                    status: 'Error',
                    message: 'There was an error trying to delete the publication..'
                });
            });
        }
        catch (error) {
            return res.status(500).json({
                status: `Error -> ${error}`
            });
        }
    }
};
exports.PublicationService = PublicationService;
exports.PublicationService = PublicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publication_schema_1.Publication.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PublicationService);
//# sourceMappingURL=publication.service.js.map