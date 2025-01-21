
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

const allowedOrigins = [
    'http://localhost:3000', // Local development URL
    process.env.FRONTEND_URL // Production frontend URL (from .env)
  ];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true); // Allow requests from allowed origins
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, 
    // origin : process.env.FRONTEND_URL,
    // credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT || 8080


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
