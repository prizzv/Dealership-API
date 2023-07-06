import { connectToDB, closeConnection } from '../db.js';
import { insertCar } from './cars.js';
import { ObjectId } from 'mongodb';
import { generateFakeCarData } from '../utils/fakeData.js';

// finds a dealership by id
const findDealership = async function (id) {
    try {
        const dealershipCollection = await connectToDB("NERVESPARK", "dealership");

        const dealership = await dealershipCollection.findOne({ "_id": new ObjectId(id) });
        return dealership;
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// update the dealership with the new carId
const updateDealershipCars = async function (dealership) {
    try {
        const dealershipCollection = await connectToDB("NERVESPARK", "dealership");

        const _id = dealership._id;
        const dealershipCars = dealership.cars;

        const filter = { _id };
        const updateDocument = {
            $set: {
                "cars": dealershipCars,
            }
        }

        return await dealershipCollection.updateOne(filter, updateDocument);
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}
// update the dealership with the new deals
const updateDealershipDeals = async function (dealership) {
    try {
        const dealershipCollection = await connectToDB("NERVESPARK", "dealership");

        const _id = dealership._id;
        const dealershipDeals = dealership.deals;

        const filter = { _id };
        const updateDocument = {
            $set: {
                "deals": dealershipDeals,
            }
        }

        return await dealershipCollection.updateOne(filter, updateDocument);
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// update the dealership with the new sold vehicles
const updateDealershipSoldCars = async function (dealership) {
    try {
        const dealershipCollection = await connectToDB("NERVESPARK", "dealership");

        const _id = dealership._id;
        const dealershipSoldVehicles = dealership.sold_vehicles;

        const filter = { _id };
        const updateDocument = {
            $set: {
                "sold_vehicles": dealershipSoldVehicles,
            }
        }

        return await dealershipCollection.updateOne(filter, updateDocument);
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// create a new dealership
const insertDealership = async function (doc) {
    try {
        const dealershipCollection = await connectToDB("NERVESPARK", "dealership");

        // console.log(await dealershipCollection.insertMany(doc));
        return await dealershipCollection.insertOne(doc);
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

const viewDealershipDeal = async function (dealershipId) {
    try {
        const dealsCollection = await connectToDB("NERVESPARK", "deal");

        return await dealsCollection.find({ "car_id": new ObjectId(carId) }).toArray();
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// insertCarToDealership("64a477f467cbd1e797e8bb9c", generateFakeCarData());

export { insertDealership, updateDealershipCars, findDealership, updateDealershipDeals, updateDealershipSoldCars };