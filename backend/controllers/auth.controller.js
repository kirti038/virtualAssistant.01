import genToken from "../config/token"
import User from "../models/user.model"

import bcrypt from "bcryptjs"


export const signup = async (req,res)=>{
  try {

    const {name,email,password}=req.body 

    const existEmail= await User.findOne({email})
    if(existEmail){
      return res.status(400).json({message:"email already exists !"})
    }
    
    if(password.length<6){
      return res.status(400).json({message:" password must be at least 6 characters !"})
    }


    const hashdPassword = await bcrypt.hash(password,10)
    const user = await User.create({
      name,password:hashdPassword,email
    })

    const token = await genToken(user._id)

    res.cookie("token",token,{
      httpOnly:true,
      maxAge:7*24*60*1000,
      secure:false

    })

    return res.status(201).json(user)

  } catch (error) {
        return res.status(5000).json({message:`internal ${error}`})
  }
}



export const Login= async (req,res)=>{
  try {

    const {email,password}=req.body 

    const user= await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"email does not  exists !"})
    }
    
    const isMatch = await bcrypt.compare(password,hashdPassword)

    if(!isMatch){
      return res.status(400).json({message:"incorrect password"})
    }
   


    

    const token = await genToken(user._id)

    res.cookie("token",token,{
      httpOnly:true,
      maxAge:7*24*60*1000,
      secure:false

    })

    return res.status(201).json(user)

  } catch (error) {
        return res.status(5000).json({message:`login error  ${error}`})
  }

}


export const logOut = async (req,res)=>{
  try {
    res.clearCookie('token')
    return res.status(200).json({message:"log out successfully"})
    
  } catch (error) {
     return res.status(500).json({message:`logout error ${error}`})
  }
}