import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    eventName:{ type:String, required: true },
    eventDescription:{ type:String, required: true },
    eventDay:{ type:String, required: true },
    eventMonth:{ type:String, required: true },
    eventYear:{ type:String, required: true },
    eventStartTime:{ type:String, required: true },
    eventVenue:{ type:String, required: true },
    orgName:{ type:String, required: true },
    orgContact:{ type:String, required: true },
    approved:{ type:Boolean, required:true},
    guest:{type:Array}
})


const event = mongoose.model("events",eventSchema);

export default event;