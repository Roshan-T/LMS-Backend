import { app } from "./app";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./utils/db";

cloudinary.config({
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});
app.listen(process.env.port, () => {
  console.log(`Server running on port ${process.env.port}`);
  connectDB();
});
