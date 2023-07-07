import { findCarByObjectId } from "../models/cars.js";
import { findSoldVehicleById } from "../models/soldVehicles.js";
import { findUserById, insertUser, findUserByEmail } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

// get user owned cars.
const getOwnedCars = async (req, res) => {
    const userId = req.user.user_id;

    const user = await findUserById(userId);
    
    const result = [];
    for (let i = 0; i < user.vehicle_info.length; i++) {
        result.push(await findSoldVehicleById(user.vehicle_info[i]));
        result[i].vehicle_info = await findCarByObjectId(result[i].car_id);
    }

    res.json({ result });
}

// creating a new user.
const userSignup = async (req, res) => {
    try {
        // Authenticate the user.
        const { user_email, user_location, password, user_info } = req.body;

        if (user_email != null && password != null) {
            const hashedPassword = await bcrypt.hash(password, 10);
            // console.log(hashedPassword);
            const user = { user_email, user_location, password: hashedPassword, vehicle_info: [] , user_info};
            const userId = await insertUser(user);
            // create Authorization token for the user.

            jwt.sign({ user_id: user._id, user_email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
                return res.json({ token });
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// logging in an existing user.
const userLogin = async (req, res) => {
    //Authenticate the user.
    const { user_email, password } = req.body;
    const user = await findUserByEmail(user_email);

    if (user == null) {
        return res.status(400).json({ message: "Cannot find user" });
    }

    try {
        const validate = await bcrypt.compare(password, user.password);

        if (validate) {
            // Authorize the user.
            const accessToken = jwt.sign({ user_id: user._id ,user_email}, process.env.ACCESS_TOKEN_SECRET);

            return res.json({ accessToken });
        }

        return res.json({ message: "User not authenticated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default { getOwnedCars, userSignup, userLogin };