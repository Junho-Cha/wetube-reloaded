import Video from "../models/Video";

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

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching:` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing:` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; //req.body로 form 안에 value를 받는다.
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  await video.save(); //DB에 데이터 저장!
  return res.redirect("/");
};
