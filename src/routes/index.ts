import { Router } from "express";
import userRouter from "./user.route";

const routerRoot: Router = Router();

routerRoot.use("/user", userRouter);

export default routerRoot;
