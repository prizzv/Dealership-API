import express from 'express';
var router = express.Router();
import UserController from '../controllers/userController.js';
import { verifyToken, verifyUser } from '../middleware/auth.js';

// To view all vehicles owned by user
router.get('/ownedCars', verifyToken, verifyUser, UserController.getOwnedCars);  // DONE:

router.post('/signup', UserController.userSignup);  // DONE:

router.post('/login', verifyToken, UserController.userLogin);  // DONE:

export default router;