import { faker } from '@faker-js/faker';
import { connectToDB, closeConnection } from '../db.js';

const generateFakeCarData = () => {
    return {
        type: faker.vehicle.type(),
        name: faker.commerce.productName(),
        model: faker.vehicle.model(),
        car_info: faker.datatype.json(),
    };
}

async function createFakeData() {
    let result = [];
    for (let i = 0; i < 5; i++) {
        result[i] = generateFakeCarData();
    }
    insertCar(result);
    console.log(result);
}

// finds all the cars.
const findCars = async function () {
    try {
        const carsCollection = await connectToDB("NERVESPARK", "cars");


        // return await carsCollection.find().toArray();

        result = await carsCollection.find().toArray();

        console.log(result);

    } catch (e) {
        console.error(e);
    } finally {
        await connection.close();
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

// export { fakeCarData };