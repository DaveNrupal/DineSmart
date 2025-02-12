import express from "express"
import bookUserTable from "../controllers/bookingController.js"

const bookingRoute = express.Router()

bookingRoute.post("/bookTable", bookUserTable);

export default bookingRoute;