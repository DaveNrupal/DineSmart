import FoodDonationModel from '../models/foodDonation.js';

export const createFoodDonation = async (req, res) => {
  try {
    const { meals } = req.body;
    const foodDonation = new FoodDonationModel({ meals });
    await foodDonation.save();
    res.status(201).send('Food donation successful');
  } catch (error) {
    res.status(500).send('Error processing food donation');
  }
};
