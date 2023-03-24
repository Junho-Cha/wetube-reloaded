import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  // pre("save") - DB에 저장하기 전 가로채서 작업하는 함수
  this.password = await bcrypt.hash(this.password, 5); // password를 5번 해싱
  // 여기서 this.password는 유저가 작성한 password를 의미한다.
});

const User = mongoose.model("User", userSchema);
export default User;
