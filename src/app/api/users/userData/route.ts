import { NextResponse,NextRequest } from "next/server";
import {mongoDbConnect} from "@/dbConfig/dbConfig"
import User from "@/models/signupModel";
import { GetTokenData } from "@/helpers/ExtractDataFromToken";

mongoDbConnect();

export async function GET(request:NextRequest){
    try {
        // we call the the tokendecode function to get user id
        const userId = await GetTokenData(request);

        // based on this id we will search in data base using "User" is there user exist or not "select" means give me everything except password
        const user = await User.findOne({_id:userId}).select('-password -createdAt');
        // we return the user here
        return NextResponse.json({
            message:"User found successfully!",
            data:user,
            success:true
        },{status:200})

    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}
