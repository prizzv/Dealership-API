import { faker } from '@faker-js/faker';
import { insertCar } from '../models/cars.js'
import { insertDealer } from '../models/dealership.js';
import { insertUser } from '../models/user.js';

// creates the fake car data.
const generateFakeCarData = () => {
    return {
        type: faker.vehicle.type(),
        name: faker.commerce.productName(),
        model: faker.vehicle.model(),
        car_info: faker.datatype.json(),
    };
}
// creates the fake user data.
const generateFakeUserData = () => {
    return {
        user_email: faker.internet.email(),
        user_location: faker.location.zipCode(),
        user_info: faker.datatype.json(),
        password: faker.internet.password(),
        vehical_info: faker.string.uuid(),
    };
}

// creates the fake dealer data.
const generateFakeDealerData = () => {
    return {
        dealership_email: faker.internet.email(),
        dealership_id: faker.string.uuid(),
        dealership_name: faker.company.name(),
        password: faker.internet.password(),
        dealership_info: faker.datatype.json(),
        cars: faker.helpers.uniqueArray(["maruti", "suzuki", "alto", "Porche"],1),
        deals: faker.helpers.uniqueArray([faker.number.int({ min: 1000000 })],1),
        sold_vehicles: faker.helpers.uniqueArray(faker.number.int({ min: 1000000 }),1),
    };
}

async function createFakeData() {
    let result = [];
    for (let i = 0; i < 5; i++) {
        // result[i] = generateFakeCarData();
        // result[i] = generateFakeUserData();
        // result[i] = generateFakeDealerData();
    }
    // insertCar(result);
    // insertDealer(generateFakeDealerData());
    // insertUser(result);

    console.log(result);
}

// createFakeData();

export { generateFakeCarData, generateFakeUserData, generateFakeDealerData };