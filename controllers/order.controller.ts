import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncErros";

import ErrorHandler from "../utils/ErrorHandler";

import Order, { IOrder } from "../models/order.model";

import User from "../models/user.model";

import Course from "../models/course.model";

import path from "path";
import ejs from "ejs";

import sendMail from "../utils/sendMail";

import Notification from "../models/notification.model";
import { getAllOrdersSevice, newOrder } from "../servies/order.service";

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const user = await User.findById(req.user?._id);
      const courseExistsInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      if (courseExistsInUser) {
        return next(new ErrorHandler("You have already purchased", 404));
      }
      const course = await Course.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      const data: any = {
        courseId: course._id,
        userId: user?._id,
      };

      const mailData = {
        order: {
          _id: (course._id as any).toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
        user?.courses.push(course?._id as any);
        await user?.save();
        const notification = await Notification.create({
          user: user?._id,
          title: "New Order",
          message: "You have new order " + course.name,
        });
        if (course.purchased) {
          course.purchased += 1;
        }
        newOrder(data, res, next);
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 404));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

//get all users for admin only

export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersSevice(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
