import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder {
  courseId: string;
  userId: string;
  payment_info: Object;
}

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model("Order", orderSchema);

export default Order;
