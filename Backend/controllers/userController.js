import { findCarByObjectId } from "../models/cars.js";
import { findSoldVehicleById } from "../models/soldVehicles.js";
import { findUserById } from "../models/user.js";

// get user owned cars.
const getOwnedCars = async (req, res) => {
    const userId = "64a45b0645ab0ac45445df59"; //TODO: get the user id from request params

    const user = await findUserById(userId);

    const result = [];
    for(let i=0; i<user.vehicle_info.length; i++){
        result.push(await findSoldVehicleById(user.vehicle_info[i]));
        result[i].vehicle_info = await findCarByObjectId(result[i].car_id);
    }

    res.json({result});
}

export default { getOwnedCars };