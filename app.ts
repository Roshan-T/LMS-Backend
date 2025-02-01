import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import "dotenv/config";

import errorHandler from "./middleware/error";
export const app = express();

//body praser
app.use(express.json({ limit: "50mb" }));

//cookie parser

app.use(cookieParser());

//cors : allow frontend url only to make request to server

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//routes
import userRoutes from "./routes/user.route";
import courseRoutes from "./routes/course.route";
import orderRoutes from "./routes/order.route";
import notificationRoutes from "./routes/notification.route";
import analyticsRoutes from "./routes/analytics.route";
import layoutRoutes from "./routes/layout.route";

app.use("/api/v1", userRoutes);
app.use("/api/v1", courseRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", notificationRoutes);
app.use("/api/v1", analyticsRoutes);
app.use("/api/v1", layoutRoutes);

//TESTING api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);
