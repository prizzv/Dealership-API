import { connectToDB, closeConnection } from '../db.js';

const insertUser = async function (doc) {
    try {
        const userCollection = await connectToDB("NERVESPARK", "user");

        console.log(await userCollection.insertMany(doc));
        // return await userCollection.insertOne(doc);
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// createFakeData();

export { insertUser };