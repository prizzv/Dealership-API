import express from 'express';
var router = express.Router();
import CarsController from '../controllers/carsController.js'

// To view all cars
router.get('/', CarsController.getAllCars);

// To view dealerships with a certain car
// router.get('/dealership', CarsController.get);

//  To view all deals on a certain car
// router.get('/deals', );

export default router;
