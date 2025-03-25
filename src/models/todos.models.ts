import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  priority: {
    type: "string",
  },
  completed: { type: Boolean, default: false },
  tags:[{
    type: "string",
  }],
  createdAt: { type: Date, default: ()=> new Date() },
  dueDate: {
    type: Date,
  },
  note : [{
    type: "string",
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
},{timestamps: true});
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
