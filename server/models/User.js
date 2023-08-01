import mongoose from "mongoose";

const Group = {
  A: 'A',
  B: 'B',
  C: 'C',
};

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  group: {
    type: String,
    enum: Object.values(Group),
    required: true,
  },
});

export default mongoose.model("User", userSchema);
