import express from 'express';
var router = express.Router();
import {fakeDealerData} from '../models/dealership.js'

//a. dealership can view all cars
router.get('/', function(req, res, next) {
  console.log(fakeDealerData);

  res.json(fakeDealerData);
});
//b. dealership can view all cars sold by itself.
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// //c. dealership can add cars
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
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
