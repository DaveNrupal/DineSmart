import express from "express"
import { bookUserTable, bookingInfo } from "../controllers/bookingController.js"

const bookingRoute = express.Router()

bookingRoute.post("/bookTable", bookUserTable);
bookingRoute.post("/getBookings", bookingInfo);

export default bookingRoute;