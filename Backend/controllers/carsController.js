import { findCars } from '../models/cars.js';
import { findDeals } from '../models/deal.js';
import { findCarByObjectId } from '../models/cars.js';

const getAllCars = async function (req, res, next) {
    const result = await findCars();
    // console.log(await findCars());

    return res.json(result);
}

const getDeals = async function (req, res, next) {
    const carId = req.params.car_id;

    const deals = await findDeals();

    const result = [];
    let j = 0;
    for (let i = 0; i < deals.length; i++) {
        // console.log(deals[i].car_id, carId);

        if (deals[i].car_id == carId) {
            result.push(deals[i]);
            result[j].car_id = await findCarByObjectId(result[j].car_id);
            j++;
        }
    }

    return res.json({ result });
}


export default { getAllCars, getDeals };