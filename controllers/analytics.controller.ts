import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

import { CatchAsyncError } from "../middleware/catchAsyncErros";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import User from "../models/user.model";
import Course from "../models/course.model";
import Order from "../models/order.model";

//get user analytics --- admin
export const getUserAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await generateLast12MonthsData(User);
    res.status(200).json({
      success: true,
      users,
    });
  }
);

//get course analytics --- admin
export const getCourseAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const courses = await generateLast12MonthsData(Course);
    res.status(200).json({
      success: true,
      courses,
    });
  }
);
