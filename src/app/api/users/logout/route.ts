import { NextResponse } from "next/server";

export async function GET(){
    try {
        // create response. response can set cookies 
        const response = NextResponse.json({
            message:"Logout Successfully",
            success:true
        },{status:200});

        // now we will set token value "". so when there is no token value means user is no longer login
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});

        return response;

    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}