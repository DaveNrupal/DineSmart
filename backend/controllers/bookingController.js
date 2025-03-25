import eventModel from "../models/eventModel.js";
import tablebookingModel from "../models/tablebookingModel.js";
import userModel from "../models/userModel.js";

const bookUserTable = async (req, res) => {
  try {
    const { email, numberOfPeople, date, time } = req.body.formData;

    // Validate input
    if (!email || !numberOfPeople || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    let user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const bookingData = new tablebookingModel({
      userId: user._id,
      date: date,
      time: time,
      numberOfPeople: numberOfPeople,
    });
    await bookingData.save();

    res.json({
      success: true,
      message: "Table booked successfully",
      bookingData: bookingData,
    });
  } catch (error) {
    res.json({ success: false, message: "Server error", error });
  }
};

const bookingInfo = async (req, res) => {
  try {
    const userBookData = await tablebookingModel.find({
      userId: req.body.userId,
    });
    res.json({ success: true, data: userBookData });
  } catch (error) {
    res.json({ success: false, message: "Server Error", error });
  }
};

const allBookings = async (req, res) => {
  try {
    const bookingData = await tablebookingModel.find();
    res.json({ success: true, data: bookingData });
  } catch (error) {
    res.json({ success: false, message: "Server Error", error });
  }
};

const removeUserTable = async (req, res) => {
  try {
    const { tableId } = req.body;

    if (!tableId) {
      return res
        .status(400)
        .json({ success: false, message: "Table ID is required." });
    }

    const deleteTable = await tablebookingModel.findByIdAndDelete(tableId);

    if (!deleteTable) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found." });
    }

    res.json({ success: true, message: "Table deleted successfully." });
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getEventInfo = async (req, res) => {
  try {
    const events = await eventModel.find({ userId: req.body.userId });
    res.json({ success: true, data: events });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const allEvents = async (req, res) => {
  try {
    const eventData = await eventModel.find();
    res.json({ success: true, data: eventData });
  } catch (error) {
    res.json({ success: false, message: "Server Error", error });
  }
};

const bookUserEvent = async (req, res) => {
  const {
    email,
    name,
    phone,
    numberOfPeople,
    eventType,
    date,
    fromTime,
    Totime,
    specialRequests,
  } = req.body.formData;

  if (
    !email ||
    !name ||
    !phone ||
    !numberOfPeople ||
    !eventType ||
    !date ||
    !fromTime ||
    !Totime ||
    !specialRequests
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Find the user by email
  let user = await userModel.findOne({ email });

  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  const newEventBooking = new eventModel({
    userId: user._id,
    eventType: eventType,
    eventDate: date,
    fromTime: fromTime,
    Totime: Totime,
    numberOfPeople: numberOfPeople,
  });
  await newEventBooking.save();
  res.json({
    success: true,
    message: "Event booked successfully",
    bookingData: user.newEventBooking,
  });
};

const removeUserEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res
        .status(400)
        .json({ success: false, message: "Event ID is required." });
    }

    const eventdelete = await eventModel.findByIdAndDelete(eventId);

    if (!eventdelete) {
      return res
        .status(404)
        .json({ success: false, message: "event details not found." });
    }

    res.json({ success: true, message: "Booked event deleted successfully." });
  } catch (error) {
    console.error("Error deleting event booking:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export {
  bookUserTable,
  bookingInfo,
  bookUserEvent,
  getEventInfo,
  removeUserEvent,
  removeUserTable,
  allBookings,
  allEvents
};
