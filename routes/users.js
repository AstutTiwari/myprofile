const express = require('express')
const UserController = require('../controller/Users')
var passport = require('passport');
require('../config/passport.config')(passport);
const router = express.Router();

router.get('/', passport.authenticate("jwt", { session: false }), UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router