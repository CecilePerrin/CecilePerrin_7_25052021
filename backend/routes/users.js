const express = require ('express');
const router = express.Router();
const rateLimit = require('../middleware/limit');
const auth = require("../middleware/auth");
const userCrl = require('../controller/users');


router.post('/signup', userCrl.signup);
router.post('/login', rateLimit.limiter, userCrl.login);


module.exports = router;

