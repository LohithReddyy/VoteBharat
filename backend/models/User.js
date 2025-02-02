import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  hasVoted: { type: Boolean, default: false },
});


const User = mongoose.model("User", UserSchema);
export default User;
