import { Router } from "express";
import passport from "passport";
import {
  registerController,
  loginController,
  logoutController,
  editController,
  failRegisterController,
  passwordResetRequestController
} from "../controllers/session.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister", session: false }),
  registerController
);

router.get("/failregister", failRegisterController);

router.post("/login", loginController);

router.post("/recupero", passwordResetRequestController);

router.post("/logout", logoutController);

router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  editController
);

export default router;