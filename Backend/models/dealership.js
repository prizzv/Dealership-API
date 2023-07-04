import { connectToDB, closeConnection } from '../db.js';
import { insertCar } from './cars.js';
import { ObjectId } from 'mongodb';

const findDealershipAndUpdate = async function (id, carObjectId) {
    try {
        const dealershipCollection = await connectToDB("NERVESPARK", "dealership");

        const dealership = await dealershipCollection.findOne({ "_id": new ObjectId(id) });
        
        let dealershipCars = dealership.cars;
        dealershipCars.push(carObjectId);

        const fiter = { "_id": new ObjectId(id) };
        const updateDocument = {
            $set: {
                "cars": dealershipCars,
            }
        }

        return await dealershipCollection.updateOne(fiter, updateDocument);

    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// create a new dealership
const insertDealer = async function (doc) {
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

// insert a new car to a dealership
const insertCarToDealership = async function (dealershipId, doc) {
    try {
        const carData = await insertCar(doc);
    
        const dealership = await findDealershipAndUpdate(dealershipId, carData.insertedId);
        return dealership;
    } catch (error) {
        
    }

    console.log({ dealership }); 
}

// createFakeData();

export { insertDealer, insertCarToDealership };