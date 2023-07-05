import { viewDealsOnCar } from "../models/deal.js";


const dealsOnCar = async function (req, res, next) {
    const carId = "64a5016c80685ff9cfba76a6";

    const deals = await viewDealsOnCar(carId);

    res.json(deals);
}

export default { dealsOnCar };