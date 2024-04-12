import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/connectionDB/connection"
import userModel from "@/models/userModel"
import bcrypt from "bcryptjs"
import { mailSender } from "@/utils/mailer";

connect();
export async function POST(req: NextRequest) {
    const data = await req.json()
    try {
        const user = await userModel.findOne({ email: data.email })
        if (user) {
            return NextResponse.json({ message: 'User already exits', status: 400 })
        }
        const hashedPassword = await bcrypt.hashSync(data.password.toString(), 8)

        const newUser = new userModel({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
        })
        const savedUser = await newUser.save()
        await mailSender({ email: data.email, emailType: "VERIFY", userId: savedUser._id })
        return NextResponse.json({ message: "Email send to your email address please verify" }, { status: 200 })

    } catch (error) {
        return NextResponse.error()
    }
}