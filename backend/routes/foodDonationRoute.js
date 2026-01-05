import express from 'express';
import { createFoodDonation } from '../controllers/foodDonationController.js';

const foodDonationRoute = express.Router();

foodDonationRoute.post('/donate-food', createFoodDonation);

export default foodDonationRoute;
