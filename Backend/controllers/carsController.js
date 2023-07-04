import { findCars } from '../models/cars.js';


const getAllCars = async function (req, res, next) {
    const result = await findCars();
    // console.log(await findCars());

    return res.json(result);
}


export default { getAllCars };