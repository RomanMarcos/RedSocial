const jwt = require('jsonwebtoken');
const moment = require('moment');

const libJwt = require('../helpers/jwt');
const secret_key = libJwt.SECRET_KEY;

const isAuthorized = (req, res, next) => {

    if (!req.headers.authorization || req.headers.authorization === 'null') {
        return res.status(403).json({
            status: 'Error',
            message: 'The request does not have the authorization header'
        });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        let payload = jwt.decode(token, secret_key);

        if (payload.exp <= moment().unix()) { // Actual date is >= than the token expiration date
            return res.status(401).json({
                status: 'Error',
                message: 'The token expired'
            });
        }

        req.user = payload;
    } catch(error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Invalid token'
        });
    }

    next();
    
}

module.exports = {
    isAuthorized
}