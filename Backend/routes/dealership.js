import express from 'express';
var router = express.Router();
import DealershipController from '../controllers/dealershipController.js'

// user can view all cars in a dealership
router.get('/cars', DealershipController.getDealershipCars);  // DONE:

// To view all deals from a certain dealership
router.get('/deals', DealershipController.getDealershipDeals); // DONE:

// To add deals to dealership
router.post('/deals',DealershipController.newDeal);  // DONE:

// To allow user to buy a car after a deal is made
router.post('/deals/buy', DealershipController.buyCar);  // DONE:

// dealership can view all cars sold by itself.
router.get('/soldCars', DealershipController.getSoldDealershipVehicles);  //DONE: 

// To add new vehicle to the list of sold vehicles after a deal is made
// router.post('/soldCars', DealershipController.);

// dealership can add cars
router.post('/addCar', DealershipController.insertCarToDealership);  //DONE: 


export default router;
