import mongoose from "mongoose";



const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      
        type: Object, // Ensure it's an object
        default: { high: false, medium: false, low: false }, // Default values

    },
    completed: { type: Boolean, default: false },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    dueDate: {
      type: Date,
    },
    note: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
