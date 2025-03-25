import notificationModel from '../models/notification.js';

// Get notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel.find({ });
        res.json({ notifications });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

// Mark notification as read
const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.body;
        await notificationModel.findByIdAndUpdate(id, { read: true });
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read' });
    }
};

// Delete notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await notificationModel.findByIdAndDelete(id);
        res.json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification' });
    }
};

//Add Notification by admin
const addNotification = async (req,res) => {
    console.log("request body:: ",req.body);
    const notification = new notificationModel({
        message:req.body.message,
        read:false,
        createdAt:new Date()
    })
    try {
        await notification.save();
        res.json({success:true,message:"Notification Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
    addNotification
}
