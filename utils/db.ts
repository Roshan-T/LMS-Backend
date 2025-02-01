import mongoose from "mongoose";
import "dotenv/config";
const dbUrl: string = process.env.DB_URI || "";

const connectDB = async () => {
  try {
    mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database connected `);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
