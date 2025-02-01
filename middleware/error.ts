import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  //mongo id error
  if (err.name === "CastError") {
    const message = `Resource not found . Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //jwt error like wrong token
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid , try again`;
    err = new ErrorHandler(message, 400);
  }
  //jwt token expired
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired , try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
