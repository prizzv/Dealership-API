import { insertCar, findCarByObjectId } from '../models/cars.js';
import { findDealership, insertDealership, updateDealershipCars, updateDealershipDeals, updateDealershipSoldCars, findDealershipByEmail } from '../models/dealership.js';
import { findDealByObjectId, createDeal, findDealById } from '../models/deal.js'
import { newSoldVehicle, findSoldVehicleById } from '../models/soldVehicles.js';
import { findUserById, updateUserVehicles } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const insertCarToDealership = async function (req, res) {

    const dealershipId = req.dealership.dealership_id;
    const { type, name, model, car_info } = req.body;
    const newCar = { type, name, model, car_info };  

    try {
        const dealership = await findDealership(dealershipId);
        const carId = await insertCar(newCar);
        dealership.cars.push(carId);

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
const getDealershipCars = async function (req, res) {
    const { dealership_id } = req.params;

    const dealership = await findDealership(dealership_id);
    const dealershipCars = dealership.cars;

    let result = [];
    for (let i = 0; i < dealershipCars.length; i++) {
        const car = await findCarByObjectId(dealershipCars[i]);
        result.push(car);
    }

    res.json(result);
}

// get all the deals from the specific dealership
const getDealershipDeals = async function (req, res) {
    const authDealership = req.dealership;
    console.log({ authDealership });

    let dealershipID;
    if (authDealership == null) {
        dealershipID = req.params.dealership_id;
    } else {
        dealershipID = authDealership.dealership_id;
    }

    const dealership = await findDealership(dealershipID);
    const dealershipDeals = dealership.deals;

    let result = [];
    for (let i = 0; i < dealershipDeals.length; i++) {
        const deal = await findDealByObjectId(dealershipDeals[i]);
        result.push(deal);
        result[i].car_id = await findCarByObjectId(result[i].car_id);
    }

    res.json(result);
}

//get all the vehicles sold by the dealership
const getSoldDealershipVehicles = async function (req, res) {
    const dealershipId = req.dealership.dealership_id; 

    const dealership = await findDealership(dealershipId);
    const dealershipSoldCars = dealership.sold_vehicles;

    let result = [];
    for (let i = 0; i < dealershipSoldCars.length; i++) {
        result.push(await findSoldVehicleById(dealershipSoldCars[i]));
        result[i].car_id = await findCarByObjectId(result[i].car_id);
    }

    res.json(result);
}

// dealership creates a new deal.
const newDeal = async function (req, res) {
    const { deal_info } = req.body;
    const { car_id } = req.query;
    const dealershipId = req.dealership.dealership_id;

    const dealId = await createDeal(car_id, deal_info);
    const dealership = await findDealership(dealershipId);

    dealership.deals.push(dealId);

    const result = await updateDealershipDeals(dealership);

    res.json({ result });
}

// user buys a car from the dealership
const buyCar = async function (req, res) {
    const { dealership_id, deal_id } = req.params;
    const userId = req.user.user_id; 

    const deal = await findDealById(deal_id);
    const dealership = await findDealership(dealership_id);
    const user = await findUserById(userId);
    const car = await findCarByObjectId(deal.car_id);

    const vehicle_id = await newSoldVehicle(deal.car_id, car.car_info);

    user.vehicle_info.push(vehicle_id);
    console.log({ user });
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

// creating a new dealership
const dealershipSignup = async function (req, res) {

    try {
        // Authenticate the dealership.
        const { dealership_email, dealership_name, dealership_location, password, dealership_info } = req.body;

        if (dealership_email != null && password != null) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const dealership = { dealership_email, dealership_name, dealership_location, password: hashedPassword, dealership_info, cars: [], deals: [], sold_vehicles: [] };
            const dealershipId = await insertDealership(dealership);
            // create Authorization token for the user.

            jwt.sign({ dealership_id: dealership._id, dealership_email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
                return res.json({ token });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// logging in an existing dealership
const dealershipLogin = async function (req, res) {
    //Authenticate the user.
    const { dealership_email, password } = req.body;
    const dealership = await findDealershipByEmail(dealership_email);

    if (dealership == null) {
        return res.status(400).json({ message: "Cannot find dealership" });
    }

    try {
        const validate = await bcrypt.compare(password, dealership.password);

        if (validate) {
            // Authorize the user.
            const accessToken = jwt.sign({ dealership_id: dealership._id, dealership_email }, process.env.ACCESS_TOKEN_SECRET);

            return res.json({ accessToken });
        }

        return res.json({ message: "User not authenticated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default { insertCarToDealership, getDealershipCars, getSoldDealershipVehicles, getDealershipDeals, newDeal, buyCar, dealershipSignup, dealershipLogin };