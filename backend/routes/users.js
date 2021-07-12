const express = require ('express');
const router = express.Router();
const rateLimit = require('../middleware/limit');
const auth = require("../middleware/auth");
const userCrl = require('../controller/users');
const multer = require('../middleware/multer-config');

router.post('/signup', userCrl.signup);
router.post('/login', rateLimit.limiter, userCrl.login);
router.get('/', auth, userCrl.getOneUser)

router.put('/update', auth, multer, userCrl.updateProfile);

module.exports = router;

