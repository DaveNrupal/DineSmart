import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const notificationModel =  mongoose.models.notification || mongoose.model("notification",NotificationSchema);

export default notificationModel;