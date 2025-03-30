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
    mentionedUsers: [
      {
        type: String,
        trim: true,
      },
    ],
    priority: {
      type: String,
      enum: ["high", "medium", "low"], // Restrict to these values
      required: true,
    },
    isCompleted: { type: Boolean, default: false },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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

// if (mongoose.models.Todo) {
//   delete mongoose.models.Todo;
// }

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
