/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/db/dbConfig";
import Todo from "@/models/todos.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(req: NextRequest) {
  const todoId = req.nextUrl.searchParams.get("todoId");
  try {
    await Todo.findByIdAndDelete(todoId);
    return NextResponse.json(
      { message: "Todo Deleted" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
