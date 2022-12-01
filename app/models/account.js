import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  //notes: [{ type: Schema.Type.ObjectId, ref: "note" }],
});

export default mongoose.model("Accounts", AccountSchema);
