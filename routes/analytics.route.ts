import express from "express";
import { authorizeRole, isAutheticated } from "../middleware/auth";
import {
  getCourseAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";

const router = express.Router();

router.get(
  "/get-users-analytics",
  isAutheticated,
  authorizeRole("admin"),
  getUserAnalytics
);
router.get(
  "/get-courses-analytics",
  isAutheticated,
  authorizeRole("admin"),
  getCourseAnalytics
);

export default router;
