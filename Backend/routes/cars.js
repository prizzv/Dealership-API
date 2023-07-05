import express from 'express';
var router = express.Router();
import CarsController from '../controllers/carsController.js'

// To view all cars
router.get('/', CarsController.getAllCars);

// To view all cars in a dealership
// router.get('/dealership', );

// router.get('/deals', );

export default router;
