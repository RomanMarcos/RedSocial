const jwt = require('jsonwebtoken');
const moment = require('moment');
const SECRET_KEY: string = 'sQ)gsF00<286#4!!<Z432@?¡DG"ADX';

const createToken = (user) => {

    const payload: object = {
        id: user._id, 
        username: user.username,
        email: user.email, 
        iat: moment().unix(), // This paramer is related with the moment where this payload is create
        exp: moment().add(30, "days").unix()
    }

    const token: string = jwt.sign(payload, SECRET_KEY);
    return { token }
}

module.exports = {
    createToken, 
    SECRET_KEY
}