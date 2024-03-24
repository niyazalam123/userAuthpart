import { NextResponse, NextRequest } from "next/server";
import User from "@/models/signupModel";
import { mongoDbConnect } from "@/dbConfig/dbConfig";

// db connection
mongoDbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { signature } = reqBody;

        // validate is verify token is present or not
        const user = await User.findOne({ verifyToken: signature });
        if (!user) {
            return NextResponse.json({ error: "Invalid user!" }, { status: 401 })
        }

        // check token expire or not
        const currentTimestamp = Date.now();
        if (user.verifyTokenExpiry < currentTimestamp) {
            // Token expired
            return NextResponse.json({ error: "Verification token expired" }, { status: 401 })
        }

        // if token is correct and token is not expire than update user isvalid false to true
        user.isVerified = true;
        user.verifyToken = undefined; // Clear verification token after successful verification
        user.verifyTokenExpiry = undefined; // Clear token expiry
        await user.save();

        return NextResponse.json({"message":"User Verified Successfully",success:true},{status:200})
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}