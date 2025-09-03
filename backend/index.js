import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 1000

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.listen(port,()=>{
  connectDB()
  console.log("server started")
})