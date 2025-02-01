import express from "express";
import { authorizeRole, isAutheticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAutheticated,
  authorizeRole("admin"),
  getNotifications
);

notificationRoute.put(
  "/update-notification/:id",
  isAutheticated,
  authorizeRole("admin"),
  updateNotification
);

export default notificationRoute;
