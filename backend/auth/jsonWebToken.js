import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


// a middle ware that will be called on all api calls
const authMiddleWare = (req,res,next) => {

    // get token from the header
    const authHeader = req.headers["authorization"];
    const authToken = authHeader.split(" ")[1];

    // if there is no auth token then we send a unauthorised error
    if(!authToken) return res.status(401).json({message: "No token Provided"})

    // checking if the token send is correct or not
    jwt.verify(authToken , process.env.JWT_SECRET , (err, decoded) => {
        if(err) return res.status(403).json({message: "Invalid Token"})

        // if there is no error it means the token send is correct
        req.user = decoded;
        next();
    })
}




export default authMiddleWare