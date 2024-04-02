const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/dashboard/profile/:id', auth.isAuthorized, userController.profile);

module.exports = router;