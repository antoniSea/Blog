import express from "express";
import userControllers from '../Controllers/UserController.js';
import auth from '../Middleware/AuthMiddleware.js';
const router = express.Router();
router.get('/all-users', userControllers.getAll);
router.get('/users/:id', userControllers.getById);
router.put('/users/:id', userControllers.update);
router.post('/toggle-dark-mode', auth.loggedIn, userControllers.toggleDarkMode);
export default router;
