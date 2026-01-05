import donationModel  from '../models/donationModel.js';

export const createDonation = async (req, res) => {
  try {
    const { amount, isRecurring } = req.body;
    const donation = new donationModel({ amount, isRecurring });
    await donation.save();
    res.status(201).send('Donation successful');
  } catch (error) {
    res.status(500).send('Error processing donation');
  }
};
