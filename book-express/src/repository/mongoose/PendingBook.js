import { Schema, model } from "mongoose";

const pendingBookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

export default model("PendingBook", pendingBookSchema);