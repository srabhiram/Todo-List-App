/* eslint-disable @typescript-eslint/no-explicit-any */
import Todo from "@/models/todos.models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const {
      formData: { title, description, priority, note, tags, mentionedUsers, isCompleted },
    } = await req.json();
    const todoId = req.nextUrl.searchParams.get("todoId");
    if (!todoId) {
      return NextResponse.json(
        { message: "Todo ID is required" },
        { status: 400 }
      );
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, priority, note, tags, mentionedUsers, isCompleted } // Update fields
    );

    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo Updated", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
