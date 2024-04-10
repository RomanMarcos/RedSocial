"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddlewareMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require('jsonwebtoken');
const moment = require('moment');
const libJwt = require('../helpers/jwt');
const secret_key = libJwt.SECRET_KEY;
let AuthMiddlewareMiddleware = class AuthMiddlewareMiddleware {
    use(req, res, next) {
        if (!req.headers.authorization || req.headers.authorization === 'null') {
            return res.status(403).json({
                status: 'Error',
                message: 'The request does not have the authorization header'
            });
        }
        let token = req.headers.authorization.replace(/['"]+/g, '');
        try {
            let payload = jwt.decode(token, secret_key);
            if (payload.exp <= moment().unix()) {
                return res.status(401).json({
                    status: 'Error',
                    message: 'The token expired'
                });
            }
            req.user = payload;
        }
        catch (error) {
            return res.status(404).json({
                status: 'Error',
                message: 'Invalid token'
            });
        }
        next();
    }
};
exports.AuthMiddlewareMiddleware = AuthMiddlewareMiddleware;
exports.AuthMiddlewareMiddleware = AuthMiddlewareMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddlewareMiddleware);
//# sourceMappingURL=auth-middleware.middleware.js.map