import axios from "axios"

const api = axios.create({
    baseURL:"https://college-calander-app-backend.onrender.com"
})


export default api;