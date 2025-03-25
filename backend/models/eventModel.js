import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    eventType:{type:String, required:true},
    eventDate:{type:Date, required:true},
    fromTime:{type:String, required:true},
    Totime:{type:String, required:true},
    numberOfPeople:{type:String, required:true}
})

const eventModel = mongoose.models.event || mongoose.model("event",eventSchema)
export default eventModel;