/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/db/dbConfig";
import User from "@/models/users.models";
import {  NextRequest, NextResponse } from "next/server";

// Ensure database connection is established
connectDB();
export async function POST(request: NextRequest) {
    try {
        const { username, displayname } = await request.json();
        const user = await User.create({ username, displayname });
        return NextResponse.json(
            {
                message: "User created successfully",
                data: user,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error.message,
            },
            { status: 500 }
        );
    }
}
