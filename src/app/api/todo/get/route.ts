/* eslint-disable @typescript-eslint/no-explicit-any */
import Todo from "@/models/todos.models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const reqData = req.nextUrl.searchParams.get("user");
    const tasks = await Todo.find({ user: reqData });
    return NextResponse.json({
      message: "Todos found",
      data: tasks,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
