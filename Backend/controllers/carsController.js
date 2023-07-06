import { ObjectId } from 'mongodb';
import { findCars } from '../models/cars.js';
import { findDeals } from '../models/deal.js';

const getAllCars = async function (req, res, next) {
    const result = await findCars();
    // console.log(await findCars());

    return res.json(result);
}

const getDeals = async function (req, res, next) {
    const carId = new ObjectId("64a511256a49fc09c26d0720");

    const deals = await findDeals();
    const result = [];

    for(let i=0; i < deals.length; i++){
        console.log(deals[i].car_id);
        
        if(deals[i].car_id === carId){
            result.push(deals[i]);
        }
    }
    return res.json(result);
}


export default { getAllCars , getDeals};