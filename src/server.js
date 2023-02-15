import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");


app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); //기본값이 ./views이기때문에 현재 작업 디렉토리에 /src/views를 add
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
 console.log(`✔ Server listening on port http://localhost:${PORT} 🎃`);

app.listen(PORT, handleListening);