import { NextResponse,NextRequest } from "next/server";
import User from "@/models/signupModel";
import { mongoDbConnect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailers";

mongoDbConnect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        // validation , user find based on incoming email
        const user = await User.findOne({email});
        if (!user){
            return NextResponse.json({error:"User not found"},{status:401});
        }
        // Send email to user with the password reset link
        await sendMail({
            email: email,
            emailType: "FORGOT",
            userId: user._id,
        });
        return NextResponse.json({message:"Forgot password token created successfully",success:true},{status:200})

    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}