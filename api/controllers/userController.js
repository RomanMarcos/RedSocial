const userModel = require('../models/user/User');
const bcrypt = require('bcrypt');

const jwt = require('../helpers/jwt');

const login = async(req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.find({ email: email });

        if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

        if (!isPasswordCorrect) {
           return res.status(401).json({ error: `The password isn't correct. Please try again` });
        }

        const { token } = jwt.createToken(user);

        return res.status(200).json({
            status: 'Success',
            token: token
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

const signup = async(req, res) => {

    try {
        const { username, email, password } = req.body;

        const user = await userModel.find({ email: email.toLowerCase() });

        if (user.length > 0) {
            return res.status(400).json({
                status: 'The email is already in used'
            })
        }

        const { token } = jwt.createToken(user);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({username, email, password: hashedPassword});

        newUser.save()
        .then(() => {
            return res.status(200).json({
                status: 'User created successfully',
                token: token,
                user: newUser
            });
        })
        .catch((error) => {
            console.log(`There was an error: ${error}`);
            throw new Error();
        });
    } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {
    login,
    signup
}