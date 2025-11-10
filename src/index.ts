import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import routerRoot from "./routes/index.js";
// import userRouter from "./routes/user.route.js";

const app: Express = express();

app.use(express.json());

app.use("/api", routerRoot);

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send("Sorry, the requested resource was not found.");
});
app.listen(3000, () => {
  console.log("Listening http://localhost:3000");
});
