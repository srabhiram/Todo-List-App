/* eslint-disable @typescript-eslint/no-explicit-any */
import Todo from "@/models/todos.models";
import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/db/dbConfig"; // Ensure MongoDB connection

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Ensure the database is connected
    const id = await params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
