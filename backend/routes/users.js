const express = require ('express');
const router = express.Router();
const rateLimit = require('../middleware/limit');
const auth = require("../middleware/auth");
const userCrl = require('../controller/users');
const multer = require('../middleware/multer-config');


router.post('/signup', userCrl.signup);
router.post('/login', rateLimit.limiter, userCrl.login);
router.get('/', auth,userCrl.getOneUser);
router.get('/allUser', auth, userCrl.getAllUser)
router.get('/:name', auth, userCrl.getUserProfile)
router.delete('/delete', auth,userCrl.deleteProfile);
router.delete('/delete/:name', auth,userCrl.deleteProfileAdmin);
router.put('/update', auth, multer,userCrl.updateProfile)
router.put('/updatePassword', auth, multer,userCrl.updatePassword);

module.exports = router;

