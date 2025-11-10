import { Router, type Request, type Response } from "express";
import { errorHandler } from "../error-handler.js";
import { list, update, user, create } from "../controllers/user.controller.js";

const userRouter: Router = Router();

userRouter.post("/", errorHandler(create));
userRouter.get("/", errorHandler(list));
userRouter.get("/:id", errorHandler(user));
userRouter.patch("/:id", errorHandler(update));

export default userRouter;

// TODO: there's delete verb.
