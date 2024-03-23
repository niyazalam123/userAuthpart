import {mongoDbConnect} from "@/dbConfig/dbConfig";
import User from "@/models/signupModel";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextResponse,NextRequest } from "next/server";

mongoDbConnect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {userName,password} = reqBody;

        // username exist or not 
        const user = await User.findOne({userName});
        if (!user){
            return NextResponse.json({error:"UserName Does Not Matched!"},{status:400})
        }

        // if username is correct then we will check password that perticular username wale ke password shi hai ya nhi
        const validatePassword = await bcryptjs.compare(password,user.password);
        if (!validatePassword){
            return NextResponse.json({error:"Password Does Not Matched!"},{status:400});
        };
        
        // token data create
        const tokenData = {
            id:user._id,
            userName:user.userName,
            email:user.email
        };


        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECREAT!,{expiresIn:"1d"});

        // create response who will talk to user cookies
        const response = NextResponse.json({
            message:"Login Successfully",
            success:true
        },{status:200});

        // send token to cookies
        response.cookies.set("token",token,{httpOnly:true});

        return response;
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}