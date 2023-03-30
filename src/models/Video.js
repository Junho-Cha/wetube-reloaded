import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now }, //Date.now()가 되면 함수를 즉각 실행시키기 때문에 ()제외
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => word.replace(/\s/g, ``)) // #와 text 사이 공백 무시 ex) # hello -> #hello
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
/*
videoSchema.pre("save", async function () {
  // pre middleware에 save 이벤트 적용
  this.hashtags = this.hashtags[0] //첫번째 문자열 가져와
    .split(",")
    .map((word) => word.replace(/\s/g, ``))
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
*/
const Video = mongoose.model("Video", videoSchema);
export default Video;
