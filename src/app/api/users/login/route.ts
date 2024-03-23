import {mongoDbConnect} from "@/dbConfig/dbConfig";
import User from "@/models/signupModel";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextResponse,NextRequest } from "next/server";

mongoDbConnect();

export async function POST(request:NextRequest){
}