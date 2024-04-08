const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const publicationController = require('../controllers/publicationController');
const auth = require('../middlewares/auth');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// User endpoints
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/dashboard/profile/:id', auth.isAuthorized, userController.profile);
router.get('/dashboard/users/:id', auth.isAuthorized, userController.getUsers)

// Publication endpoints
router.post('/dashboard/newPublication', auth.isAuthorized, upload.single('file'), publicationController.createPublication);
router.post('/dashboard/removePublication/:id', auth.isAuthorized, publicationController.removePublication);

module.exports = router;