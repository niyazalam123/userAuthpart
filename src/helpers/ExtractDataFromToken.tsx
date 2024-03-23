import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export function GetTokenData(request:NextRequest){
    try {
        // get token from cookies
        const token =request.cookies.get("token")?.value || "";

        // decode token data, from here i will get tokenAlldATA
        const tokenDecodedData:any = jwt.verify(token,process.env.TOKEN_SECREAT!);

        // and i return only id from here
        return tokenDecodedData.id;

    } catch (error) {
        throw new Error('unable to extract token data!');
    }
}