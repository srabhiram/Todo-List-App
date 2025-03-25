/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/db/dbConfig";
import User from "@/models/users.models";
import { NextResponse } from "next/server";

// Ensure database connection is established
connectDB();

export async function GET() {
  try {
    const users = await User.find();

    if (!users.length) {
      return NextResponse.json(
        {
          message: "No users found",
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        data: users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
