
import express from "express"
import { useReducer } from "react"
import { Login,logOut,signup } from "../controllers/auth.controller"

const authRouter = express.Router()

useReducer.post('/signup',signup)
useReducer.post('/signin',Login)
useReducer.get("/logout",logOut)
export default authRouter