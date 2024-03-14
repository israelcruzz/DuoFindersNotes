import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handleError } from "../utills/handleErrors";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authApp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new handleError("JWT Token não informado", 401);
    }

    const [, token] = authorization.split(" ");

    const { id } = jwt.verify(token, "@notesduofinders") as JwtPayload;

    req.userId = id;

    next();
  } catch (error) {
    console.log(error);
  }
};
