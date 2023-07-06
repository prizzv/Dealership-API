import express from 'express';
var router = express.Router();
import UserController from '../controllers/userController.js';

// To view all vehicles owned by user
router.get('/ownedCars', UserController.getOwnedCars);  // DONE:

export default router;
