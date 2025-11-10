import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from "express";
import { ErrorCode, HttpException } from "./exceptions/root.exception";
import { InternalException } from "./exceptions/internal.exception";

export const errorHandler = (method: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err) {
      let exception: HttpException;
      if (err instanceof HttpException) {
        exception = err;
      } else {
        exception = new InternalException(
          "Something went wrong!",
          err,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
