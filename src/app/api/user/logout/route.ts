import { connect } from "@/connectionDB/connection"
import { NextRequest, NextResponse } from "next/server"

connect();
export async function GET(req: NextRequest,) {
    try {
        const response = NextResponse.json({
            message: 'Logout successfully'
        }, { status: 200 })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}