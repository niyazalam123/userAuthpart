import { NextResponse, NextRequest } from "next/server";
import User from "@/models/signupModel";
import { mongoDbConnect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailers"

mongoDbConnect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { signature } = reqBody;

        // check user exist based on token url
        const user = await User.findOne({ verifyToken: signature });
        if (!user) {
            return NextResponse.json({ error: "Invalid user" }, { status: 401 })
        }

        // we will check if isVerified is true or false if false then genearte token again other wise do not
        if (user.isVerified) {
            return NextResponse.json({ error: 'User Already verified!' }, { status: 401 })
        }

        // regenrate token if user exist
        await sendMail({
            email: user.email,
            emailType: "VERIFY",
            userId: user._id,
        });

        return NextResponse.json({
            message:"Token Regenerated successfully",
            success:true
        },{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}