import cron from "node-cron";
import Notification from "../models/notification.model";

import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncErros";

import ErrorHandler from "../utils/ErrorHandler";

//get all notification for admin only
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update notification status -- only admin
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (notification) {
        notification.status = "read";
      } else {
        return next(new ErrorHandler("Notification not found", 404));
      }
      await notification.save();
      const notifications = await Notification.find().sort({ createAt: -1 });
      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//corn to schedule things on nodejs
//delete notification
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Deleted Read Notifications");
});
