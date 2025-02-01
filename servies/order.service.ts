import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErros";
import Order from "../models/order.model";

//create new order
export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await Order.create(data);
    res.status(201).json({ success: true, order });
  }
);
//get all orders
export const getAllOrdersSevice = async (res: Response) => {
  const courses = await Order.find().sort({ createdAt: -1 });
  res.status(201).json({
    sucess: true,
    courses,
  });
};
