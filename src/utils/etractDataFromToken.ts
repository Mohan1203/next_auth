import { connect } from "@/connectionDB/connection"
import { NextRequest, NextResponse } from "next/server"
import userModel from "@/models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

connect();
export async function getDataFromToken(req: NextRequest) {
    try {
        console.log("Hello world")
        const token = await req.cookies.get('token')?.value || "";
        console.log("token", req.cookies.get('token'))
        const decodedToken: any = await jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id
    } catch (error: any) {
        console.log(error.message)
    }


}