import menuModel from "../models/menuModel.js";

// all menu list
const listMenu = async (req,res) => {
    try {
        const menuItems = await menuModel.find();
        res.json({success:true,data:menuItems})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const getMenuItem = async (req,res) => {
    try {
        const menuItem = await menuModel.findById(req.query.itemId);
        res.json({success:true,data:menuItem})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {listMenu, getMenuItem}