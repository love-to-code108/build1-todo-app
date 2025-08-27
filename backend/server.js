import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// db related
import connectDB from "./DB/connectDB.js";
import User from "./DB/userSchema.js";


dotenv.config()

const app = express();

// allowing the specific urls
app.use(cors({
    origin:process.env.FRONTEND_URL
}))


// for json parsing
app.use(express.json())


// connecting to database
connectDB();

// app.get('/',(req,res) => {
//     res.send("<h1> Hello World </h1>");
// })

app.post('/signup',async(req,res) => {

    const {email , password} = req.body;
    console.log(`email: ${email}, \npassword: ${password}`);

    const newUser = new User({
        email:email,
        password:password
    });

    
    // Throwing error if the email already exists
    try{
       await newUser.save();

    }catch(err) {
        // console.log("Email Already Exists: ",err);
        res.send("Email Already Exists")
    }

    
    
    console.log("Data Saved to DB")
    res.send(200);
})

app.listen( 5000, () => {
    console.log("Server Running")
})