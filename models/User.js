import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  favorites: {
    type: Array,
    required: false,
    default: [],
  },
});
export default mongoose.models.User || mongoose.model('User', UserSchema);