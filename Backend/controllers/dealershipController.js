import { insertCar, findCarByObjectId } from '../models/cars.js';
import { findDealership, updateDealershipCars, updateDealershipDeals, updateDealershipSoldCars } from '../models/dealership.js';
import { generateFakeCarData, generateFakeDealData, generateFakeSoldVehicleData } from '../utils/fakeData.js';
import { ObjectId } from 'mongodb';
import { findDealByObjectId, createDeal, findDealById } from '../models/deal.js'
import { newSoldVehicle } from '../models/soldVehicles.js';
import { findUserById, updateUserVehicles } from '../models/user.js';

const insertCarToDealership = async function (req, res, next) {
    //TODO: take the car data from request body.
    const dealershipId = "64a477f467cbd1e797e8bb9c";
    const newCar = generateFakeCarData();  //TODO: take the car data from request body.

    try {
        const dealership = await findDealership(dealershipId);
        const carData = await insertCar(newCar);
        dealership.cars.push(carData.insertedId);

        const result = await updateDealershipCars(dealership);

        if (result.acknowledged) {
            return res.json({ message: "Car added successfully" });
        }
    } catch (error) {
        console.error(error);
        console.log("Error in inserting car to dealership");
    }

    res.json({ message: "Error in adding a car" });
}

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

const getDealershipDeals = async function (req, res, next) {
    const dealershipId = "64a477f467cbd1e797e8bb9c"; //TODO: get the dealership id from request body

    const dealership = await findDealership(dealershipId);
    const dealershipDeals = dealership.deals;

    let result = [];
    for (let i = 0; i < dealershipDeals.length; i++) {
        const deal = await findDealByObjectId(dealershipDeals[i]);
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
// dealership creates a new deal.
const newDeal = async function (req, res, next) {
    const dealershipId = "64a477f467cbd1e797e8bb9c"; //TODO: get the dealership id from request body
    const carId = "64a511256a49fc09c26d0720";
    const dealInfo = generateFakeDealData();

    const dealId = await createDeal(carId, dealInfo);
    const dealership = await findDealership(dealershipId);

    dealership.deals.push(dealId);

    const result = await updateDealershipDeals(dealership);

    res.json({ result });
}

// user buys a car from the dealership
const buyCar = async function (req, res, next) {
    const dealershipId = "64a477f467cbd1e797e8bb9c"; //TODO: get the dealership id from request body
    const dealId = "64a5d4ace17f0bc7e6b92c21";  //TODO: get the deal id from request body
    const userId = "64a45b0645ab0ac45445df59"; //TODO: get the user id from request body

    const deal = await findDealById(dealId);
    const dealership = await findDealership(dealershipId);
    const user = await findUserById(userId);
    // console.log({deal});
    // console.log({dealership});
    
    const vehicle_id = await newSoldVehicle(deal.car_id, generateFakeSoldVehicleData());
    
    user.vehicle_info.push(vehicle_id);
    console.log({user});
    dealership.sold_vehicles.push(vehicle_id);

    const dealershipResult = await updateDealershipSoldCars(dealership);
    if (dealershipResult.acknowledged) {
        console.log("dealership updated");
        const userResult = await updateUserVehicles(user);

        if (userResult.acknowledged) {
            console.log("user updated")
            return res.json({ userResult, dealershipResult });
        }
    }

    return res.json({ message: "Error in buying a car" });
}

export default { insertCarToDealership, getDealershipCars, getSoldDealershipVehicles, getDealershipDeals, newDeal, buyCar };