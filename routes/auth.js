const express = require('express')
const AuthController = require('../controller/auth')
var passport = require('passport');
require('../config/passport.config')(passport);
const router = express.Router();

router.post('/login', passport.authenticate('local-login', { session: false }), AuthController.login);
router.post('/login/token', passport.authenticate('local-login', { session: false }), AuthController.loginToken);
router.post('/sign-up',passport.authenticate('local-signup', { session: false }), AuthController.signup);

module.exports = router
