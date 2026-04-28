import User from "../model/user.js"
import jwt  from "jsonwebtoken"
import TryCtach from "../middlewares/trycatch.js"
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import { oauth2client } from "../config/googleConfig.js";
import { oauth2 } from "googleapis/build/src/apis/oauth2/index.js";
import axios from "axios";




export const loginUser = TryCtach(async(req,res)=>{
        const {code}=req.body;

        if(!code){
            return res.status(400).json({
                message:"Authorization code is required"
            })
        }

        const googleRes= await oauth2client.getToken(code)

        oauth2client.setCredentials(googleRes.tokens)

        const userRes= await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const {email,name,picture}=userRes.data;

        let user=await User.findOne({email})

        if(!user){
            user=await User.create({
                name,
                email,
                image : picture,  
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SEC as string,{
            expiresIn:"15d",
        } );

        res.status(200).json({
            message:"LogIn Success",
            token,
            user,
        })
         
});

const allowedRoles = ["Customer" , "Rider", "Seller"] as const;

type Role = (typeof allowedRoles) [number];

export const addUserRole = TryCtach(async(req:AuthenticatedRequest, res)=>{
    if(!req.user?._id){
        return res.status(401).json({
            message:"Unauthorized",
        });
    }

    const {role}=req.body as {role:Role};
    if(!allowedRoles.includes(role)){
        return res.status(400).json({
            message:"Invalid Role",
        })
    }

    const user=await User.findByIdAndUpdate(req.user._id,{role},{new:true})

    if(!user){
        return res.status(404).json({
            message:"User Not found",
        });
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SEC as string,{
        expiresIn:"15d",
    } );

    res.json({user,token})
});

export const myProfile= TryCtach(async (req: AuthenticatedRequest ,res)=>{
    const user = req.user;
    res.json(user);

})