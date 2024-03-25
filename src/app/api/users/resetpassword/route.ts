import { mongoDbConnect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/signupModel";
import bcryptjs from "bcryptjs";

mongoDbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { signature, password } = reqBody;

        // validation based on token token present or not in db
        const user = await User.findOne({ forgotPasswordToken: signature });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        // token expiry check
        const currentTimeStamp = Date.now();
        if (user.forgotPasswordTokenExpiry < currentTimeStamp) {
            return NextResponse.json({ error: "Token expire,go to forgot password page enter email again" },{status:401})
        }

        // hashed new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Update user's password and clear token
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message:"Password reset successfully!",success:true},{status:200})

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}