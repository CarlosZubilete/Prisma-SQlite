import { Router, type Request, type Response } from "express";
import { db } from "../config/db.js";

const userRouter: Router = Router();

userRouter.get("/", async (_, res: Response) => {
  try {
    const users = await db.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "There's some bad to get users" });
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await db.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "There's some bad to create users" });
  }
});

export default userRouter;
