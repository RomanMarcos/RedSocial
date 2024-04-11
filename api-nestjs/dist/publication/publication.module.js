"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationModule = void 0;
const common_1 = require("@nestjs/common");
const publication_controller_1 = require("./publication.controller");
const publication_service_1 = require("./publication.service");
const mongoose_1 = require("@nestjs/mongoose");
const publication_schema_1 = require("./publication.schema");
const user_schema_1 = require("../user/user.schema");
const auth_middleware_middleware_1 = require("../auth-middleware/auth-middleware.middleware");
const upload_middleware_middleware_1 = require("../upload-middleware/upload-middleware.middleware");
const express = require('express');
let PublicationModule = class PublicationModule {
    configure(consumer) {
        consumer.apply(express.json(), express.urlencoded({ extended: true })).forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        consumer.apply(auth_middleware_middleware_1.AuthMiddlewareMiddleware).forRoutes('api/newPublication', 'api/removePublication/:id'),
            consumer.apply(upload_middleware_middleware_1.UploadMiddlewareMiddleware).forRoutes('api/newPublication');
    }
};
exports.PublicationModule = PublicationModule;
exports.PublicationModule = PublicationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: publication_schema_1.Publication.name, schema: publication_schema_1.publicationModel },
                { name: user_schema_1.User.name, schema: user_schema_1.userModel }
            ])],
        controllers: [publication_controller_1.PublicationController],
        providers: [publication_service_1.PublicationService]
    })
], PublicationModule);
//# sourceMappingURL=publication.module.js.map