import { connectToDB, closeConnection } from '../db.js';

// finds all the cars.
const findCars = async function () {
    try {
        const carsCollection = await connectToDB("NERVESPARK", "cars");

        // return await carsCollection.find().toArray();

        return await carsCollection.find().toArray();

        // console.log(result);
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
        
        return await carsCollection.insertOne(doc);
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// createFakeData();

export { findCars, insertCar  };