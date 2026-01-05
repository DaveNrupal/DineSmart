import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    isRecurring: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
})

const donationModel =  mongoose.models.donation || mongoose.model("donation",donationSchema);

export default donationModel;