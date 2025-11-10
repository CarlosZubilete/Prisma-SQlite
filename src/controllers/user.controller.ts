import { type Request, type Response } from "express";
import { db } from "../config/db";
import { type User } from "../generated/prisma/index";

export const create = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await db.user.create({
    data: {
      name,
      email,
    },
  });
  res.status(201).json(user);
};

export const user = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id == "undefined") return;
  const user_id: string = id;
  const user = await db.user.findUnique({
    where: {
      id: parseInt(user_id),
    },
  });
  res.json(user);
};

export const list = async (req: Request, res: Response) => {
  const list = await db.user.findMany();
  res.status(200).json(list);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log("Hi i am at update| id = " + id);

  if (typeof id == "undefined") return;

  const { name, email } = req.body;

  const user_id: number = parseInt(id);

  const user: User | null = await db.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user) return res.status(400).json({ message: "USER NOT FOUND" });
  const userUpdate = await db.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: name ?? user.name,
      email: email ?? user.email,
    },
  });

  res.json(userUpdate);
};
