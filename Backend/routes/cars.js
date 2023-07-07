import express from 'express';
var router = express.Router();
import CarsController from '../controllers/carsController.js'
import { verifyUser, verifyToken } from '../middleware/auth.js';

// To view all cars
router.get('/', CarsController.getAllCars);  // DONE: 

// To view dealerships with a certain car
// router.get('/dealership', CarsController.get);

// To view all deals on a certain car
router.get('/:car_id/deals', verifyToken, verifyUser, CarsController.getDeals);

export default router;
