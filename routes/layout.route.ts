import express from "express";
import { authorizeRole, isAutheticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";

const router = express.Router();
router.post(
  "/create-layout",
  isAutheticated,
  authorizeRole("admin"),
  createLayout
);
router.put("/edit-layout", isAutheticated, authorizeRole("admin"), editLayout);

router.get("/get-layout", getLayoutByType);
export default router;
