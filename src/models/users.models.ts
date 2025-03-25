import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userScehma);
export default User;
