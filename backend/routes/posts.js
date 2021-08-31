const express = require ('express');
const router = express.Router();
const auth = require("../middleware/auth");
const postCrl = require('../controller/posts');
const multer = require('../middleware/multer-config');


router.post('/',auth, multer, postCrl.createPost);
router.get('/:id', auth, postCrl.getOnePost);
router.get('/', auth, postCrl.getAllPost)
router.delete('/:id', auth, postCrl.deletepost)
router.put('/:id', auth, multer, postCrl.modifyPost);

//en cours de developpement
router.post('/:postId/comments', auth, postCrl.createComment)
router.get('/:postId/comments/:id', auth, postCrl.getOneComment)
router.get('/:postId/comments/', auth, postCrl.getAllComments)
router.put('/:postId/comments/:id', auth, postCrl.modifyComment)
router.delete('/:postId/comments/:id', auth, postCrl.deleteComment)

router.post('/:postId/likes', auth, postCrl.likeOnePost)

module.exports = router;
