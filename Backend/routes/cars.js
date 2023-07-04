import express from 'express';
var router = express.Router();
import CarsController from '../controllers/carsController.js'

router.get('/', CarsController.getAllCars);

export default router;
