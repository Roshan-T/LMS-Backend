import { NextFunction, Response, Request } from "express";

import Course from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErros";

//create course
export const createCouse = CatchAsyncError(async (data: any, res: Response) => {
  const course = await Course.create(data);
  res.status(201).json({
    success: true,
    course,
  });
});
//get all courses
export const getAllCoursesSevice = async (res: Response) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.status(201).json({
    sucess: true,
    courses,
  });
};
