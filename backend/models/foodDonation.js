import mongoose from "mongoose";

const foodDonationSchema = new mongoose.Schema({
    meals: { type: Number, required: true },
    date: { type: Date, default: Date.now },
})

const foodDonationModel =  mongoose.models.foodDonation || mongoose.model("foodDonation",foodDonationSchema);

export default foodDonationModel;