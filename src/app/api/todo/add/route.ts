/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/db/dbConfig";
import Todo from "@/models/todos.models";
import { NextResponse } from "next/server";
import User from "@/models/users.models";
import { todo } from "node:test";

connectDB();
export async function POST(request: Request) {
  const data = await request.json();
  console.log("data: " , data);
  const {formData: {title, description, priority, note, tags, mentionedUsers}, userId} = data;
  try {
    const todo = new Todo({
      title,
      description,
      user : userId,
      priority,
      note,
      tags,
      mentionedUsers
    });
    await todo.save();
    const updatedData = await User.findOneAndUpdate(todo.user, {
      $push: { todos: todo },
    });
    console.log(updatedData);
    return NextResponse.json(
      {
        data: todo,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        data: todo
      },
      {
        status: 500,
      }
    );
  }
}
