// infrastructure/database/models/UserModel.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true },
  userName: { type: String, required: true, unique: true },
  role: {type: String, require: true },
  email: { type: String, required: true, unique: true },   
  password: { type: String, required: true, select: false }, 
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;