import { Router } from "express";
import passport from "passport";
import UserDTO from "../dto/user.dto.js";

const router = Router();

router.get("/register", (req, res) => {
  res.render("register", { title: "Registrate" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.render("profile", { title: "Perfil", user: req.user });
})

router.get("/recupero", (req, res) => {
  res.render("recupero", { title: "Recuperar password" });
});

router.get("/edit", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.render("edit", { title: "Editar perfil", user: req.user });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({ status: "success", payload: userDTO });
  }
);

export default router;