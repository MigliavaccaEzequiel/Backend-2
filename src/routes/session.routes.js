import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
    session: false,
  }),
  sessionController.register
);

router.get("/failregister", sessionController.failRegister);

router.post("/login", sessionController.login);

router.post("/recupero", sessionController.recupero);

router.post("/logout", sessionController.logout);

router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  sessionController.edit
);

export default router;