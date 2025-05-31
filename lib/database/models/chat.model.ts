import { Schema, model, models } from "mongoose";

const PartsSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

// Message schema for individual messages
const MessageSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  parts: [PartsSchema],
});

// Chat schema for conversations
const ChatSchema = new Schema(
  {
    user: {
      type: Schema.Types.Mixed,
      ref: "User", // Link to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    messages: [MessageSchema], // Array of question-answer pairs
  },
  { timestamps: true }, // Automatically manage createdAt and updatedAt
);

// Export the Chat model
const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat;
