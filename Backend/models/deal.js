import { connectToDB, closeConnection } from '../db.js';
import { ObjectId } from 'mongodb';

// creates a new deal.
const createDeal = async function (doc) {
    
}

// finds all the deals for a specific car
const viewDealsOnCar = async function (carId) {
    try {
        const dealsCollection = await connectToDB("NERVESPARK", "deal");

        return await dealsCollection.find({ "car_id": new ObjectId(carId) }).toArray();
    } catch (error) {
        console.error(error);
    }finally{
        await closeConnection();
        console.log("Connection closed")
    }
}



export { createDeal, viewDealsOnCar };