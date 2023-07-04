import express from 'express';
var router = express.Router();
import { insertCarToDealership } from '../models/dealership.js'
import { generateFakeCarData, generateFakeUserData, generateFakeDealerData } from '../utils/fakeData.js';

//a. dealership can view all cars
router.get('/', function (req, res, next) {
    // console.log(fakeDealerData);

    res.json({});
});
//b. dealership can view all cars sold by itself.
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//c. dealership can add cars
router.post('/car', async function (req, res, next) {
    //TODO: take the car data from request body.    

    const carData = generateFakeCarData();
    // console.log(carData);
    const result = await insertCarToDealership("64a477105431a793bda633d3", carData);

    if(result.acknowledged) {
        return res.json({message: "Car added successfully"});
    }
    res.json({message: "Error in adding a car"});
});

// //d. dealership can view deals provided by dealership.
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// //e. dealership can add deals to dealership
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// //f. dealership can view vehicles sold by dealership
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// //g. add new vehicle to the list of sold vehicles after a deal is made.
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

export default router;
