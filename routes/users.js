const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

// * POST /user/signin
router.post('/signin', usersController.signin.post);

// * POST /user/signout
router.post('/signout', usersController.signout.post);

// * POST /user/signup
router.post('/signup', usersController.signup.post);

// * GET /user/info
router.get('/info', usersController.info.get);

module.exports = router;
