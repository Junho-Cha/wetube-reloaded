import Video from "../models/Video";
import User from "../models/User";

/* callback 
Video.find({}, (error, videos) => {
  if(error){
    return res.render("server-error")
  }
  return res.render("home", {pageTitle: "Home", videos});
});
에러 관리가 쉬움
*/

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("server-error");
  }
  // promise 방식 async(비동기) await(수행될 때까지 기다림) 코드 실행 순서 조절가능
}; //render -> 두 개의 인수를 받을 수 있다 (파일명 + 변수들)
/*
- model.find()는 비동기 처리를 활용해 사용할 수 있다.
- 비동기 처리 방법에는 callback과 promise가 있으며, callback은 에러 관리가 쉽다는 장점이, promise는 await를 활용해 코드를 실행하는 순서를 조절해줄 수 있다는 장점이 있다.
- promise는 async로 비동기 처리를하고, await로 코드 실행 순서를 조절한다.
*/

export const watch = async (req, res) => {
  const { id } = req.params;
  //populate 하면 mogoose가 video를 찾고 그 안에서 owner를 찾아줌
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id }); // Video는 영상 model video는 DB에서 검색한 영상 object
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const file = req.file;
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      fileUrl: file.path,
      owner: _id,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
/*
$regex: new RegExp(keyword, "i") -> keyword가 포함된 것들을 검색.
$regex: new RegExp(`^${keyword}`, "i") -> keyword로 시작되는 것들을 검색.
$regex: new RegExp(`${keyword}$`, "i") -> keyword로 끝나는 것들을 검색.
(여기서 "i" = Welcome,welcome 둘다 같게 해주는것 즉 lowercase,uppercase의 구분을 없게 해주는것)
( mongoose가 아닌 mongoDB가 해주는 기능이다)
*/
