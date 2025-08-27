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






// the signup route
app.post('/signup',async(req,res) => {

    const {email , password} = req.body;    

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








// the sign in route
app.post("/signin", async(req,res) => {

    // receiving the data and converting it to variables
    const {email , password} = req.body;


    try{
    // searching for the user in the db
    const user = await User.findOne({email});

    // if user is not found
    if(!user){
        return res.send({message:"User not found"});
    }

    // if user is found matching password
    if(user.password !== password){
        return res.json({message:"Invalid Credentials"})
    }

    // if user email and password match with db
    res.json({message:"Login Sucessful", userOBJ:user})

    }catch(err){
        console.log(err);
    }
})





















app.listen( 5000, () => {
    console.log("Server Running")
})