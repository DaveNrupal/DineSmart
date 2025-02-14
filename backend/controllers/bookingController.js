import userModel from "../models/userModel.js";

const bookUserTable = async (req, res) => {
    try {
        const {email, numberOfPeople, date, time } = req.body.formData;

        // Validate input
        if (!email || !numberOfPeople || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user by email
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.json({success:false,message:"User not found"});
        }

        // Update bookingData in user document
        user.bookingData = { numberOfPeople, date, time };
        await user.save();

        res.json({ success: true, message: "Table booked successfully", bookingData: user.bookingData });
    } catch (error) {
        res.json({ success: false, message: "Server error", error });
    }
};

const bookingInfo = async (req, res) => {
    try {
       const userBookData = await userModel.find();
       res.json({success:true,data:userBookData});
    } catch (error) {
        res.json({success:false,message:"Server Error",error});
    }
};

export {bookUserTable,bookingInfo};