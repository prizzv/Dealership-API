import { connectToDB, closeConnection } from '../db.js';
import { ObjectId } from 'mongodb';

// finds all the cars.
const findCars = async function () {
    try {
        const carsCollection = await connectToDB("NERVESPARK", "cars");

        return await carsCollection.find().toArray();
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
};
// finds a specific car by object id.
const findCarByObjectId = async function (_id) {
    try {
        const carsCollection = await connectToDB("NERVESPARK", "cars");

        return await carsCollection.findOne({ _id });
    } catch (e) {
        console.error(e);

    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
};

// insert a new car
const insertCar = async function (doc) {
    try {
        const carsCollection = await connectToDB("NERVESPARK", "cars");
        // console.log(await carsCollection.insertMany(doc));

        const result = await carsCollection.insertOne(doc);

        if(result.acknowledged){
            return result.insertedId;
        }else{
            throw new Error("Error inserting a new car");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
};

// findCarById();

export { findCars, insertCar, findCarByObjectId };