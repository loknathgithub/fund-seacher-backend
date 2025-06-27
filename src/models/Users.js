import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // In production, hash this!
  savedFunds: [{ type: String }] // Store mutual fund IDs as strings
});

const User = model('User', userSchema);

export default User;
