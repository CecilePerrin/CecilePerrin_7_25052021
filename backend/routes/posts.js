const express = require ('express');
const router = express.Router();
const auth = require("../middleware/auth");
const postCrl = require('../controller/posts');
const multer = require('../middleware/multer-config');
const likesCtrl = require('../controller/posts');


router.post('/',auth, multer, postCrl.createPost);
router.get('/:id', auth, postCrl.getPostUser);
router.get('/', auth, postCrl.getAllPost)
router.delete('/:id', auth, postCrl.deletepost)
router.put('/:id', auth, multer, postCrl.modifyPost);


router.post('/:postId/comments', auth, postCrl.createComment);
router.get('/:postId/comments', auth, postCrl.getAllComments);
router.put('/:postId/comments/:id', auth, postCrl.modifyComment);
router.delete('/:postId/comments/:id', auth, postCrl.deleteComment);

router.get('/:postId/likes/:id', auth, likesCtrl.getUserLike);
router.get('/:postId/likes', auth, likesCtrl.getAllLikes);
router.post('/:postId/likes', auth, likesCtrl.likeOnePost);
module.exports = router;
