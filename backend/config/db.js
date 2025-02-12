import mongoose from "mongoose";

export const connectDB = async () => {
    (await mongoose.connect('mongodb://localhost:27017/DineSmart')).isObjectIdOrHexString(()=>console.log("DB Connected"));
}