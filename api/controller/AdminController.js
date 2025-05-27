import { data } from "react-router-dom"
import db from "../db/db.config.js"
import jwt from "jsonwebtoken"
import { email } from "zod/v4"
export const AdminLogin=async(req,res)=>{
       const {username,password}=req.body
       console.log("req body",req.body)
    try {
        const findUser=await db.admin.findUnique({
            where:{
                username
            },
        })
        if(!findUser){
            return res.status(404).json({
                status:"failed",
                data:"User not found"
            })
        }
        if(findUser.password!=password){
             return res.status(404).json({
                status:"failed",
                data:"Invalid password"
            })
        }
        const token=jwt.sign({id:findUser.id,username:findUser.username},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN 
        })
            res.cookie("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict", 
            maxAge: 1000 * 60 * 60 * 24, 
            });

        return res.status(200).json({
            status:"success",
            token,
            findUser
        })
    } catch (error) {
        console.error("Error creating user",error)
        res.status(500).send("Internal Server Error",error)
        
    }
}