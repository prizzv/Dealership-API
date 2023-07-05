import express from 'express';
var router = express.Router();
import DealershipController from '../controllers/dealershipController.js'
import { generateFakeCarData } from '../utils/fakeData.js';
import CarsController from '../controllers/carsController.js';

// user can view all cars in a dealership
// router.get('/cars',);

// To view all deals from a certain dealership
router.get('/deals', DealershipController.getDealershipDeals);

// To add deals to dealership
// router.post('/deals',);

// To allow user to buy a car after a deal is made
// router.post('/deals/buy', );

// dealership can view all cars sold by itself.
router.get('/soldCars', DealershipController.getSoldDealershipVehicles);

// To add new vehicle to the list of sold vehicles after a deal is made
// router.post('/soldCars',);

// dealership can add cars
router.post('/addCar', DealershipController.insertCarToDealership);


export default router;
