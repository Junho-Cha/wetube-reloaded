export const trending = (req, res) => res.render("home", {pageTitle: "Home"}); //render -> 두 개의 인수를 받을 수 있다 (파일명 + 변수들)
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => {
    return res.send("Delete Video");
};
