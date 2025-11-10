import express, { type Express } from "express";
import routerRoot from "./routes/index.js";
// import userRouter from "./routes/user.route.js";

const app: Express = express();

app.use(express.json());

app.use("/api", routerRoot);

app.listen(3000, () => {
  console.log("Listening http://localhost:3000");
});
