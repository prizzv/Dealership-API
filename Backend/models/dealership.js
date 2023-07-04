import { faker } from '@faker-js/faker';
import { connectToDB, closeConnection } from '../db.js';

const generateFakeDealerData = () => {
    return {
        dealership_email: faker.internet.email(),
        dealership_id: faker.string.uuid(),
        dealership_name: faker.company.name(),
        password: faker.internet.password(),
        dealership_info: faker.datatype.json(),
        cars: faker.string.uuid(),
        deals: faker.string.uuid(),
        sold_vehicles: faker.string.uuid(),
    };
}

async function createFakeData() {
    let result = [];
    for (let i = 0; i < 5; i++) {
        result[i] = generateFakeDealerData();
    }
    insertDealer(result);
    // console.log(result);
}

const insertDealer = async function (doc) {
    try {
        const carsCollection = await connectToDB("NERVESPARK", "dealership");
        
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

// export { fakeDealerData };