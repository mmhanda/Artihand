import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
}, {timestamps: true});

userSchema.methods.matchPassword = async function (entredPass) {
  return await bcrypt.compare(entredPass, this.password);
}

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(2);
  this.password = await bcrypt.hash(this.password, salt);
});

const user_Module = mongoose.model("User", userSchema);

export default user_Module;