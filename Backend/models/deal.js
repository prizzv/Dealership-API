import { connectToDB, closeConnection } from '../db.js';
import { ObjectId } from 'mongodb';

// creates a new deal.
const createDeal = async function (car_id, deal_info) {
    try {
        const dealsCollection = await connectToDB("NERVESPARK", "deal");
        
        const doc = {
            car_id: new ObjectId(car_id),
            deal_info
        }

        const result = await dealsCollection.insertOne(doc);

        if (result.acknowledged) {
            return result.insertedId;
        }
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// finds all the deals for a specific car
const viewDealsOnCar = async function (carId) {
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
const findDealByObjectId = async function (_id) {
    try {
        const dealsCollection = await connectToDB("NERVESPARK", "deal");

        return await dealsCollection.findOne({ _id });
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}
const findDealById = async function (dealId) {
    try {
        const dealsCollection = await connectToDB("NERVESPARK", "deal");

        return await dealsCollection.findOne({ _id: new ObjectId(dealId) });
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

export { createDeal, viewDealsOnCar, findDealByObjectId ,findDealById};