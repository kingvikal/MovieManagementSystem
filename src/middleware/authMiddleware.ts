import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/userEntity";
import { AppDataSource } from "../services/AppDataSource";

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

interface RequestUser extends Request {
  user: any;
}
export const IsUser = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqHeaders = req.headers.authorization;

    const token = reqHeaders && reqHeaders.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "No token provided. Access Denied" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);

    const user: any = await userRepository.findOne({
      where: { userId: decoded.id },
    });

    if (!user) {
      return res.status(400).json("invalid");
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const IsAdmin = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!["admin"].includes(req.user.userType)) {
      return res.status(420).json({
        error: "Unauthorized",
        message: "Sorry! You dont have access",
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
