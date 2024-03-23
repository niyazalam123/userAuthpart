import {mongoDbConnect} from "@/dbConfig/dbConfig";
import User from "@/models/signupModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse,NextRequest } from "next/server";

async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {userName,password} = reqBody;

        // check userName is exist or not 
        const userNameFind = await User.findOne({userName});
        console.log("userNameFind",userNameFind);
        if (!userNameFind){
            return NextResponse.json({error:"UserName does not matched!"},{status:500})
        }

        // check password is correct or not 
        const passwordMatched = await bcrypt.compare(password, userNameFind.password);
        console.log("passwordMatched",passwordMatched);
        if (!passwordMatched){
            return NextResponse.json({error:"Password does not matched!"},{status:500})
        }

        // create tokenData
        const tokenData = {
            id:userNameFind._id,
            userName:userNameFind.userName,
            email:userNameFind.email
        }

        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECREAT!,{expiresIn:"1d"})

        // create response part
        const response = NextResponse.json({
            message:"Login successfully",
            success:true
        },{status:200});

        // set token to cookies
        response.cookies.set("token",token,{httpOnly:true});

        // return response
        return response;
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}