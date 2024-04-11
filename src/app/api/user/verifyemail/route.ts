import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/connectionDB/connection"
import userModel from "@/models/userModel"
import bcrypt from "bcryptjs"

connect();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        const foundedUser = await userModel.findOne({ userVerificationToken: token, userVerificationTokenExpiry: { $gt: Date.now() } })
        if (!foundedUser) {
            return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
        }
        foundedUser.isVerified = true
        foundedUser.userVerificationToken = undefined;
        foundedUser.userVerificationTokenExpiry = undefined;
        await foundedUser.save()
        return NextResponse.json({
            message: "User verified successfully",
            success: true
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}