import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {type:String,required:false},
    description: {type:String,required:false},
    price:{type:Number,required:false},
    image:{type:String,required:false},
    category:{type:String,required:false}
})

const menuModel =  mongoose.models.menu || mongoose.model("menu",menuSchema);

export default menuModel;