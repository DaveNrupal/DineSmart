import express from "express"
import authMiddleware from "../middleware/auth.js";
import { bookUserTable, bookingInfo, bookUserEvent, getEventInfo,removeUserEvent, removeUserTable,allBookings, allEvents } from "../controllers/bookingController.js"

const bookingRoute = express.Router()

bookingRoute.post("/bookTable", bookUserTable);
bookingRoute.post("/getBookings",authMiddleware, bookingInfo);
bookingRoute.post("/removeTable", removeUserTable);
bookingRoute.post("/bookEvent", bookUserEvent);
bookingRoute.post("/getEvents",authMiddleware, getEventInfo);
bookingRoute.post("/removeEvent", removeUserEvent);
bookingRoute.get("/getAllBookings", allBookings);
bookingRoute.get("/getAllEvents", allEvents)

export default bookingRoute;