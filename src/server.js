import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); //기본값이 ./views이기때문에 현재 작업 디렉토리에 /src/views를 add
app.use(logger);
app.use(express.urlencoded({ extended: true })); //express App이 form의 value를 이해할 수 있게 한다.
app.use(
  //session middleware
  session({
    //사이트로 들어오는 모두를 기억한다.
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
