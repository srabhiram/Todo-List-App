import mongoose from "mongoose";


const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
    },
    description: {
      type: String,
    
    },
    priority: {
      high: { type: Boolean },
      medium: { type: Boolean },
      low: { type: Boolean },
      
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
if (mongoose.models.Todo) {
  delete mongoose.models.Todo; // Remove the cached model
}
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
