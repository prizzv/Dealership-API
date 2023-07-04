//contains the connection to database

import { MongoClient, ObjectId } from "mongodb";

//local host does not work now so use the below
const uri = "mongodb://0.0.0.0:27017/";

const connection = new MongoClient(uri);

// block to connect to DB and collection. 
async function connectToDB(dbName, collectionName) {
    try {
        await connection.connect()
        console.log("Connected to database");

        const myDb = connection.db(dbName);
        return myDb.collection(collectionName);
    } catch (e) {
        console.error(e);
        console.log("Could not connect to db")
    }
};

async function closeConnection() {
    try {
        await connection.close()
    } catch (e) {
        console.error(e);
        console.log("Could not close connection to db")
    }
};

export { connectToDB, closeConnection };