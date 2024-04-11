import { connect } from "@/connectionDB/connection"
import { NextRequest, NextResponse } from "next/server"
import userModel from "@/models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

connect();
export async function POST(req: NextRequest,) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User Not found please register" }, { status: 404 })
        }
        const validPassword = await bcrypt.compare(password.toString(), user.password)
        if (!validPassword) {
            return NextResponse.json({ message: "Incorrect Password or email ID" }, { status: 400 })
        }

        const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET!)
        const response = NextResponse.json({
            message: 'LoggedIn Successfully',
            success: true
        })

        response.cookies.set("token", jwtToken, { httpOnly: true },)

        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}   