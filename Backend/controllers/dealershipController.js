import { findCars, insertCar, findCarByObjectId } from '../models/cars.js';
import { findDealership, updateDealershipCars } from '../models/dealership.js';
import { generateFakeCarData } from '../utils/fakeData.js';
import { ObjectId } from 'mongodb';

const insertCarToDealership = async function (req, res, next) {
    //TODO: take the car data from request body.
    const dealershipId = "64a477f467cbd1e797e8bb9c";
    const newCar = generateFakeCarData();  //TODO: take the car data from request body.

    try {
        const dealership = await findDealership(dealershipId);
        const carData = await insertCar(newCar);
        const result = await updateDealershipCars(dealership, carData.insertedId);

        if (result.acknowledged) {
            return res.json({ message: "Car added successfully" });
        }
    } catch (error) {
        console.error(error);
        console.log("Error in inserting car to dealership");
    }

    res.json({ message: "Error in adding a car" });
}
// CHECK:
// get all the cars from the specific dealership
const getDealershipCars = async function (req, res, next) {
    const dealershipId = "64a477f467cbd1e797e8bb9c"; //TODO: get the dealership id from request body

    const dealership = await findDealership(dealershipId);
    const dealershipCars = dealership.cars;

    let result = [];
    for (let i = 0; i < dealershipCars.length; i++) {
        const car = await findCarByObjectId(dealershipCars[i]);
        result.push(car);
    }

    res.json(result);
}
// CHECK:
const getDealershipDeals = async function (req, res, next) {
    const dealershipId = "64a477f467cbd1e797e8bb9c"; //TODO: get the dealership id from request body

    const dealership = await findDealership(dealershipId);
    const dealershipDeals = dealership.deals;

    let result = [];
    for (let i = 0; i < dealershipDeals.length; i++) {
        const deal = await findCarByObjectId(dealershipDeals[i]);
        result.push(deal);
    }
    res.json(result);
}
// CHECK:
//get all the vehicles sold by the dealership
const getSoldDealershipVehicles = async function (req, res, next) {
    const dealershipId = "64a477f467cbd1e797e8bb9c"; //TODO: get the dealership id from request body

    const dealership = await findDealership(dealershipId);
    const dealershipSoldCars = dealership.sold_vehicles;

    let result = [];
    for (let i = 0; i < dealershipSoldCars.length; i++) {
        const soldCar = await findCarByObjectId(dealershipSoldCars[i]);
        result.push(soldCar);
    }

    res.json(result);
}

export default { insertCarToDealership, getDealershipCars, getSoldDealershipVehicles, getDealershipDeals };