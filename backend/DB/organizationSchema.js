

import mongoose from "mongoose";


const organizationSchema = new mongoose.Schema({
    
    organizationName:{type:String , required: true}
})


const Organization = mongoose.model("organization" , organizationSchema);

export default Organization;