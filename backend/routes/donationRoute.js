import express from 'express';
import { createDonation } from '../controllers/donationController.js';

const donationRoute = express.Router();

donationRoute.post('/AddDonate', createDonation);

export default donationRoute;
