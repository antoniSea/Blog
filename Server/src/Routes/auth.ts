import express from "express";
import userControllers from '../Controllers/UserController.js';
import auth from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/require-token', userControllers.requireToken);
router.post('/create-user', auth.loggedIn, userControllers.create);
router.get('/user', auth.loggedIn, userControllers.getUser);

export default router;
