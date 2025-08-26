import express from "express"
import cors from "cors"
const FRONTEND_URL = "http://localhost:5173"

const app = express();

// allowing the specific urls
app.use(cors({
    origin:FRONTEND_URL
}))


// for json parsing
app.use(express.json())


// app.get('/',(req,res) => {
//     res.send("<h1> Hello World </h1>");
// })

app.post('/signup',(req,res) => {

    const {email , password} = req.body;
    console.log(email,password);


    res.send(200);
})

app.listen( 5000, () => {
    console.log("Server Running")
})