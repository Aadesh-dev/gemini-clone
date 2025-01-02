import { Schema, model, models } from "mongoose";

// Message schema for individual messages
const MessageSchema = new Schema(
  {
    question: {
      type: String, // User's prompt
      required: true,
    },
    answer: {
      type: String, // LLM's response
      required: true,
    },
  },
  { timestamps: true, _id: false } // No individual _id for each message
);

// Chat schema for conversations
const ChatSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId, // Link to the User model
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    messages: [MessageSchema], // Array of question-answer pairs
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

// Export the Chat model
const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat;
