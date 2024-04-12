import { connect } from "@/connectionDB/connection"
import { NextRequest, NextResponse } from "next/server"
import userModel from "@/models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

connect();
export async function getDataFromToken(req: NextRequest) {
    try {
        const token = await req.cookies.get('token')?.value || "";
        const decodedToken: any = await jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id
    } catch (error: any) {
        console.log(error.message)
    }


}