import { connectToDB, closeConnection } from '../db.js';
import { insertCar } from './cars.js';
import { ObjectId } from 'mongodb';
import { generateFakeCarData } from '../utils/fakeData.js';

const newSoldVehicle = async function (carId, vehicle_info) {
    try {
        const soldVehiclesCollection = await connectToDB("NERVESPARK", "sold_vehicles");

        const doc = {
            car_id: new ObjectId(carId),
            vehicle_info
        }

        const result = await soldVehiclesCollection.insertOne(doc);

        if (result.acknowledged) {
            return result.insertedId;
        }
    } catch (error) {
        console.error(error);
    }finally{
        await closeConnection();
        console.log("Connection closed")
    }
}

export { newSoldVehicle };