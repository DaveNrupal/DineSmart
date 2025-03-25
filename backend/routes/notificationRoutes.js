import express from "express";
import { getUserNotifications, markNotificationAsRead, deleteNotification, addNotification } from "../controllers/notificationController.js";
import authMiddleware from "../middleware/auth.js"

const notificationRouter = express.Router();

notificationRouter.get('/allNotification', getUserNotifications);
notificationRouter.post('/mark-read', markNotificationAsRead);
notificationRouter.post('/add', addNotification);
notificationRouter.delete('/:id', deleteNotification);

export default notificationRouter;
