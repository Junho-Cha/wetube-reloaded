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
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// pre("save") - DB에 저장하기 전 가로채서 작업하는 함수
userSchema.pre("save", async function () {
  //password에 수정이 발견될 때만 아래 함수 실행
  if (this.isModified("password")) {
    // 여기서 this.password는 유저가 작성한 password를 의미한다.
    this.password = await bcrypt.hash(this.password, 5); // password를 5번 해싱
  }
});

const User = mongoose.model("User", userSchema);
export default User;
