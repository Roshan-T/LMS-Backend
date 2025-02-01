import express, { Router } from "express";

import {
  activateUser,
  deleteUser,
  getAllUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRole, isAutheticated } from "../middleware/auth";

const router = express.Router();

router.post("/registration", registrationUser);
router.post("/activate-user", activateUser);
router.post("/login-user", loginUser);
router.get("/logout-user", isAutheticated, logoutUser);
router.get("/refreshtoken", updateAccessToken);
router.get("/me", isAutheticated, getUserInfo);
router.post("/social-auth", socialAuth);
router.put("/update-user-info", isAutheticated, updateUserInfo);
router.patch("/update-user-password", isAutheticated, updatePassword);
router.patch("/update-user-avatar", isAutheticated, updateProfilePicture);

router.get("/get-users", isAutheticated, authorizeRole("admin"), getAllUser);

router.put(
  "/update-user",
  isAutheticated,
  authorizeRole("admin"),
  updateUserRole
);

router.delete(
  "/delete-user/:id",
  isAutheticated,
  authorizeRole("admin"),
  deleteUser
);
export default router;
