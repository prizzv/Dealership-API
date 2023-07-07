import { connectToDB, closeConnection } from '../db.js';
import { ObjectId } from 'mongodb';

// create a new user.
const insertUser = async function (doc) {
    try {
        const userCollection = await connectToDB("NERVESPARK", "user");

        // console.log(await userCollection.insertMany(doc));
        const result = await userCollection.insertOne(doc);

        if (result.acknowledged) {
            return result.insertedId;
        } else {
            throw new Error("Error inserting user");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// find an existing user by email.
const findUserByEmail = async function (user_email) {
    try {
        const userCollection = await connectToDB("NERVESPARK", "user");

        return await userCollection.findOne({ user_email });
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// find an existing user by id.
const findUserById = async function (userId) {
    try {
        const userCollection = await connectToDB("NERVESPARK", "user");

        return await userCollection.findOne({ _id: new ObjectId(userId) });
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// update the vehicles of an existing user.
const updateUserVehicles = async function (user) {
    try {
        const userCollection = await connectToDB("NERVESPARK", "user");

        const _id = user._id;

        const userVehicles = user.vehicle_info;

        const filter = { _id };
        const updateDocument = {
            $set: {
                "vehicle_info": userVehicles,
            }
        }

        return await userCollection.updateOne(filter, updateDocument);
    } catch (error) {
        console.error(error);
    } finally {
        await closeConnection();
        console.log("Connection closed")
    }
}

// createFakeData();

export { insertUser, findUserById, updateUserVehicles, findUserByEmail };