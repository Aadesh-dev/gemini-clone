import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  sidebarExpanded: {
    type: Boolean,
    default: true,
  },
  showIntroMessage: {
    type: Boolean,
    default: true,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
