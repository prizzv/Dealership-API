//contains the connection to database
import dotenv from 'dotenv'

dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb";

//local host does not work now so use the below
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@nervespark.dckg2yk.mongodb.net/?retryWrites=true&w=majority`;

const connection = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
});
// client.connect();
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