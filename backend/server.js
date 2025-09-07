import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// db related
import connectDB from "./DB/connectDB.js";
import User from "./DB/userSchema.js";
import event from "./DB/eventSchema.js";

// jwt
import authMiddleWare from "./auth/jsonWebToken.js";
import jwt from "jsonwebtoken"


dotenv.config()

const app = express();

// allowing the specific urls
app.use(cors({
    // origin: process.env.FRONTEND_URL
}))


// for json parsing
app.use(express.json())


// connecting to database
connectDB();






// the signup route
app.post('/signup', async (req, res) => {

    const { email, password } = req.body;

    const newUser = new User({
        email: email,
        password: password
    });


    // checking if the email already exists
    try {
        const userExists = await User.findOne({ email: email })

        // if user doesnot exists
        if (userExists === null) {
            await newUser.save()
            res.send("New user created");
        }

        else if (userExists !== null) {

            // if user already exists
            res.send("Email Already Exists")
        }

    } catch (err) {
        console.log(err);
    }

})








// the sign in route
app.post("/signin", async (req, res) => {

    // receiving the data and converting it to variables
    const { email, password } = req.body;


    try {
        // searching for the user in the db
        const user = await User.findOne({ email });

        // if user is not found
        if (!user) {
            return res.send({ message: "User not found" });
        }

        // if password does not match
        if (user.password !== password) {
            return res.json({ message: "Invalid Credentials" })
        }

        // if user email and password match with db
        // creating a json web token 
        const jwtToken = jwt.sign(
            {id: user._id , email: user.email},  // payload
            process.env.JWT_SECRET,              // secret key ( store in .env )
        )
        
        console.log(jwtToken);
        // sending a sucess message with the token
        res.json({ message: "Login Sucessful", jwtToken , user })

    } catch (err) {
        console.log(err);
    }
})







// instant sign in 
app.get("/instantsignin" , authMiddleWare , async(req,res) => {

    console.log(req.user)
    const _id  = req.user.id;
   
    // finding the user from the db
    try{

        // if sucessful sending the user data
        const user = await User.findById({ _id })
        res.json({user});
        console.log(user);


    }catch(err){
        console.log(err);
    }
})










// the event creation form
app.post("/eventcreation", async (req, res) => {

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
        eventName: eventName,
        eventDescription: eventDescription,
        eventDay: eventDay,
        eventMonth: eventMonth,
        eventYear: eventYear,
        eventStartTime: eventStartTime,
        eventVenue: eventVenue,
        orgName: orgName,
        orgContact: orgContact,
        approved: false
    })


    // saving the event to the database
    await newEvent.save();
    res.send(200);
})







// getting all the events filtered by month and year
app.post("/getallevents", async (req, res) => {

    // console.log(req.body);
    // return;


    const { stringMonth, stringYear } = req.body;
    // console.log("month",stringYear);
    const month = stringMonth;
    const year = stringYear;
    console.log(month, year)
    const eventArray = await event.find({
        eventMonth: month,
        eventYear: year,
        
    });

    console.log(eventArray);

    res.send(eventArray);


})









// getting all the approved events filtered by month and year
app.post("/getallapprovedevents", async (req, res) => {

    // console.log(req.body);
    // return;


    const { stringMonth, stringYear } = req.body;
    // console.log("month",stringYear);
    const month = stringMonth;
    const year = stringYear;
    console.log(month, year)
    const eventArray = await event.find({
        eventMonth: month,
        eventYear: year,
        approved:true
    });

    console.log(eventArray);

    res.send(eventArray);


})










// getting all the unapproved events for the inbox
app.get("/inbox", async (req, res) => {

    const unApprovedEventList = await event.find({ approved: false });
    // console.log(unApprovedEventList);
    res.send(unApprovedEventList);
})









// event approval
app.post("/eventapprove", async (req, res) => {

    const { _id, approved } = req.body;
    const eventApproval = await event.findById(_id);

    eventApproval.approved = true;
    await eventApproval.save();

    res.send("")
})




// add guest data
app.post("/addguestdata" , async(req,res) => {

    const _id = req.body.event_id;
    const guestName = req.body.guestName


    // searching the db for the event details
    let eventData = await event.findById(_id);


    // updating the db with the provided data
    eventData.guest.push(req.body);
    
    // saving the guest data
    await eventData.save()


    res.json({guestName , eventName :eventData.eventName})
    
})











app.listen(5000, () => {
    console.log("Server Running")
})