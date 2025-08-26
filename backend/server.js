import express from "express"
import cors from "cors"
const FRONTEND_URL = "http://localhost:5173"

const app = express();

app.use(cors({
    origin:FRONTEND_URL
}))


app.get('/',(req,res) => {
    res.send("<h1> Hello World </h1>");
})

app.listen( 5000, () => {
    console.log("Server Running")
})