import { findCars } from '../models/cars.js';
import { viewDealsOnCar } from '../models/deal.js';
import { findCarByObjectId } from '../models/cars.js';

const getAllCars = async function (req, res) {
    const result = await findCars();

    return res.json(result);
}

const getDeals = async function (req, res) {
    const carId = req.params.car_id;

    const deals = await viewDealsOnCar(carId);

    for (let i = 0; i < deals.length; i++) {
        deals[i].car_id = await findCarByObjectId(deals[i].car_id);
    }

    return res.json(deals);
}


export default { getAllCars, getDeals };