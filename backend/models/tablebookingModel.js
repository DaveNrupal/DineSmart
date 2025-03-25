import mongoose from "mongoose"

const tablebookingSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    date:{type:Date, required:true},
    time:{type:String, required:true},
    numberOfPeople:{type:String, required:true}
})

const tablebookingModel = mongoose.models.tablebooking || mongoose.model("tablebooking",tablebookingSchema)
export default tablebookingModel;