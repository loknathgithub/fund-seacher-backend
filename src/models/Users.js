import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, 
  savedFunds: [{ type: String }] 
});

const User = model('User', userSchema);

export default User;
