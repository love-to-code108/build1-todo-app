import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// db related
import connectDB from "./DB/connectDB.js";
import User from "./DB/userSchema.js";
import event from "./DB/eventSchema.js";


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

    
    // checking if the email already exists
    try{
    const userExists = await User.findOne({email:email})

    // if user doesnot exists
    if(userExists === null ){
        await newUser.save()
        res.send("New user created");
    }
    
    else if(userExists !== null){

        // if user already exists
        res.send("Email Already Exists")
    }

    }catch(err){
        console.log(err);
    }

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











// the event creation form
app.post("/eventcreation" , async(req,res) => {

    console.log(req.body);

    // destructuring the received data
    const {
        eventName,
        eventDescription,
        eventDay,
        eventMonth,
        eventYear,
        eventStartTime,
        eventVenue,
        orgName,
        orgContact,
        } = req.body;


    const newEvent = new event({
        eventName:eventName,
        eventDescription:eventDescription,
        eventDay:eventDay,
        eventMonth:eventMonth,
        eventYear:eventYear,
        eventStartTime:eventStartTime,
        eventVenue:eventVenue,
        orgName:orgName,
        orgContact:orgContact,
        approved:false
    })


    // saving the event to the database
    await newEvent.save();
    res.send(200);
})







// getting all the events
app.post("/getallevents" , async(req,res) => {

    console.log(req.body);
    // return;


    const { month , year } = req.body;
    console.log("month",month);

    res.send(200);


})














app.listen( 5000, () => {
    console.log("Server Running")
})