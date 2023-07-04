import { faker } from '@faker-js/faker';
import { connectToDB, closeConnection } from '../db.js';

const generateFakeUserData = () => {
    return {
        user_email: faker.internet.email(),
        user_location: faker.location.zipCode(),
        user_info: faker.datatype.json(),
        password: faker.internet.password(),
        vehical_info: faker.string.uuid(),
    };
}

async function createFakeData() {
    let result = [];
    for (let i = 0; i < 5; i++) {
        result[i] = generateFakeUserData();
    }
    insertDealer(result);
    // console.log(result);
}

const insertDealer = async function (doc) {
    try {
        const carsCollection = await connectToDB("NERVESPARK", "user");
        // console.log("data inserted successfuly")
        console.log(await carsCollection.insertMany(doc));
        // return await carsCollection.insertOne(doc);
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

createFakeData();

// export { fakeUserData };