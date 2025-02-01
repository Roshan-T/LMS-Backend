import express, { Router } from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRole, isAutheticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAutheticated,
  authorizeRole("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAutheticated,
  authorizeRole("admin"),
  editCourse
);

courseRouter.get(
  "/get-course/:id",

  getSingleCourse
);

courseRouter.get(
  "/get-courses",

  getAllCourses
);
courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);

courseRouter.put("/add-question", isAutheticated, addQuestion);
courseRouter.put("/add-answer", isAutheticated, addAnswer);
courseRouter.put("/add-review/:id", isAutheticated, addReview);
courseRouter.put(
  "/add-reply/:id",
  isAutheticated,
  authorizeRole("admin"),
  addReplyToReview
);

courseRouter.get(
  "/get-courses",
  isAutheticated,
  authorizeRole("admin"),
  getAllCourse
);

courseRouter.delete(
  "/delete-course/:id",
  isAutheticated,
  authorizeRole("admin"),
  deleteCourse
);

export default courseRouter;
