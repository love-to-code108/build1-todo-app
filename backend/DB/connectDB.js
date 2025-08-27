import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()



const connectDB = async () => {
    await mongoose
        .connect(process.env.DB_URL)
        .then(() => console.log("Mongodb Connected"))
        .catch(() => console.log("Unable to Connecte to Database"))
}

export default connectDB;
