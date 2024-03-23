import { mongoDbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/signupModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

mongoDbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userName, email, password } = reqBody;

        //existing mail is checking, email sould be unique 
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ error: "email already registered,try new email!" }, { status: 500 })
        }


        //existing username is checking, username sould be unique 
        const existinguserName = await User.findOne({ userName });
        if (existinguserName) {
            return NextResponse.json({ error: "userName already registered, try new userName" }, { status: 500 })
        }

        //making password encripted      
        // Generate a salt
        const salt = await bcryptjs.genSalt(10); // Generate a salt with 10 rounds
        // Hash the password using bcryptjs and the generated salt
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user object with hashed password
        const newUser = new User({
            userName,
            email,
            password: hashedPassword // Storing hashed password
        });

        // Save the new user to the database
        const user = await newUser.save();

        return NextResponse.json({
            message:"Signup successfully",
            success:true,
            user
        },{status:200}
        )

    } catch (error) {
        return NextResponse.json({ "error": error }, { status: 500 });
    }
}