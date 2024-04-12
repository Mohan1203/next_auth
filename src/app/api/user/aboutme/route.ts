import { connect } from "@/connectionDB/connection"
import { NextRequest, NextResponse } from "next/server"
import userModel from "@/models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { getDataFromToken } from "@/utils/etractDataFromToken";

connect();
export async function POST(req: NextRequest,) {
    try {
        const userId = await getDataFromToken(req)
        if (!userId) {
            return NextResponse.json({ data: "User not found" }, { status: 404 })
        }
        console.log(userId)
        const user = await userModel.findOne({ _id: userId }).select("-password")
        return NextResponse.json({ data: user }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}