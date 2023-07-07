import express from 'express';
var router = express.Router();
import DealershipController from '../controllers/dealershipController.js'
import { verifyToken, verifyDealership, verifyUser } from '../middleware/auth.js';

// user can view all cars in a dealership
router.get('/:dealership_id/cars', DealershipController.getDealershipCars);  // DONE:

// Dealership views all deals from itself
router.get('/deals', verifyToken, verifyDealership, DealershipController.getDealershipDeals);  // DONE: 

// User can view all deals from a dealership
router.get('/:dealership_id/deals', DealershipController.getDealershipDeals);  // DONE: 

// To add deals to dealership
router.post('/deals', verifyToken, verifyDealership, DealershipController.newDeal);  // DONE: 

// To allow user to buy a car after a deal is made
router.post('/:dealership_id/:deal_id/buy', verifyToken, verifyUser, DealershipController.buyCar);  // DONE: 

// dealership can view all cars sold by itself.
router.get('/soldCars', verifyToken, verifyDealership, DealershipController.getSoldDealershipVehicles);  // DONE: 

// To add new vehicle to the list of sold vehicles after a deal is made
// router.post('/soldCars', DealershipController.);

// dealership can add cars
router.post('/addCar', verifyToken, verifyDealership, DealershipController.insertCarToDealership);  // DONE: 

//dealership signup
router.post('/signup', DealershipController.dealershipSignup);  // DONE: 

//dealership login
router.post('/login', DealershipController.dealershipLogin);  // DONE:

export default router;
