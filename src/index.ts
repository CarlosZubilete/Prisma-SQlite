import express, { type Express } from "express";
import userRouter from "./routes/user.route.js";

const app: Express = express();

app.use(express.json());
app.use("/api/user/", userRouter);

app.listen(3000, () => {
  console.log("Listening http://localhost:3000");
});
