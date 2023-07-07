import { connectToDB, closeConnection } from '../db.js';
import { ObjectId } from 'mongodb';

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

// finds the dealership by email
const findDealershipByEmail = async function (dealership_email) {
    try {
        const dealershipCollection = await connectToDB("NERVESPARK", "dealership");

        const dealership = await dealershipCollection.findOne({ dealership_email });
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

        const result = await dealershipCollection.insertOne(doc);

        if (result.acknowledged) {
            return result.insertedId;
        } else {
            throw new Error("Error creating dealership");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// insertCarToDealership("64a477f467cbd1e797e8bb9c", generateFakeCarData());

export {
    insertDealership,
    updateDealershipCars,
    findDealership,
    updateDealershipDeals,
    updateDealershipSoldCars,
    findDealershipByEmail
};