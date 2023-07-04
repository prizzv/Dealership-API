import express from 'express';
var router = express.Router();

//a. user can view all cars
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//b. user can view all cars of a specific dealership
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//c. user can view  all the cars of a specific dealership.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//d. user can view all user owned cars
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//e. TODO: user can view all dealerships around him based on his location
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//f. user can view different deals provided by different dealerships on a certain car.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//g. user can view all the cars of a specific dealership.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//h. user can buy a car after a deal is made.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
