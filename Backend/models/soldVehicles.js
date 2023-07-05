import { connectToDB, closeConnection } from '../db.js';
import { insertCar } from './cars.js';
import { ObjectId } from 'mongodb';
import { generateFakeCarData } from '../utils/fakeData.js';

