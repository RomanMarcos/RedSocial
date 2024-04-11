"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const publication_schema_1 = require("../publication/publication.schema");
const auth_middleware_middleware_1 = require("../auth-middleware/auth-middleware.middleware");
const express = require('express');
let UserModule = class UserModule {
    configure(consumer) {
        consumer.apply(express.json(), express.urlencoded({ extended: true })).forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        consumer.apply(auth_middleware_middleware_1.AuthMiddlewareMiddleware).forRoutes('api/users/:id', 'api/profile/:id', 'api/followUser/:userId', 'api/unFollowUser/:userId');
    }
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.userModel },
                { name: publication_schema_1.Publication.name, schema: publication_schema_1.publicationModel }
            ])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map