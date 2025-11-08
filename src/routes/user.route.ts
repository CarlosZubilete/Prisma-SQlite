import { Router, type Request, type Response } from "express";
import { db } from "../config/db.js";
import { error } from "console";
import type { User } from "../generated/prisma/index.js";

const userRouter: Router = Router();

async function getUserById(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

userRouter.get("/", async (_, res: Response) => {
  try {
    const users = await db.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "There's some bad to get users" });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id == "undefined") return;

    const user_id: string = id;

    const user = await db.user.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "There's some bad to get users" });
  }
});

userRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, email } = req.body;
    if (typeof id == "undefined") return;

    const user_id: string = id;

    const user = await db.user.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (!user) return;

    const userUpdate = await db.user.update({
      where: {
        id: parseInt(user_id),
      },
      data: {
        name: name ?? user.name,
        email: email ?? user.email,
      },
    });

    res.status(200).json(userUpdate);
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

// TODO: there's delete verb.
