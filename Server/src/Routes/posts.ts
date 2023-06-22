import express from 'express';
import auth from '../Middleware/authMiddleware.js';
import postsController from '../Controllers/PostController.js';

const router = express.Router();


router.post('/create-post', auth.loggedIn, postsController.create);
router.get('/all-posts', postsController.getAll);
router.get('/posts/:id', postsController.getById);
router.delete('/posts/:id', auth.loggedIn, postsController.delete);

export default router;

