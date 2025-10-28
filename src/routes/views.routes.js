import { Router } from "express";
//import { verifyToken } from "../utils/index.js";
import passport from "passport";

const router = Router();

router.get("/register", (req, res) => {
  res.render("register", { title: "Registrate" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// router.get("/profile", (req, res) => {
//   //const user =  req.session.user ;
//   //console.log(user);
//   const token = req.cookies.authCookie;
//   console.log(`Token desde la cookie: ${token}`);
  
//   const { user } = verifyToken(token);
//   console.log(user);
  

//   res.render("profile", { title: "PROFILE", user: user });
// });

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.render("profile", { title: "Perfil", user: req.user.user });
})

router.get("/recupero", (req, res) => {
  res.render("recupero", { title: "Recuperar password" });
});

router.get("/edit", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.render("edit", { title: "Editar perfil", user: req.user.user });
});

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user.user });
});

export default router;