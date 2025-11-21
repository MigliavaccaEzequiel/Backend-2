import { Router } from "express";
import passport from "passport";
import userModel from "../dao/models/user.model.js";
import cartModel from "../dao/models/cart.model.js";
import { isValidPassword } from "../utils/index.js";
import { generateToken } from "../utils/index.js";
import { createHash } from "../utils/index.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
    session: false,
  }),
  async (req, res) => {
    try {
      
      const user = req.user;

      const newCart = await cartModel.create({ products: [] });

      user.cart = newCart._id;
      await user.save();

      return res.redirect("/login");
    } catch (error) {
      console.error("Error al crear carrito:", error);
      return res.status(500).send("Error al crear carrito del usuario");
    }
  }
);

router.get("/failregister", (req, res) => {
  res.status(400).send("Error al registrar usuario");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Error de credenciales" });

    if (!isValidPassword(password, user.password)) {
      return res.status(401).json({ message: "Error de credenciales" });
    }

    const token = generateToken({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
      role: user.role,
      cart: user.cart,
    });

    res.cookie("authCookie", token, { maxAge: 3600000, httpOnly: true });
    return res.redirect("/profile");
  } catch (error) {
    return res.status(500).json({ message: "Error interno", error });
  }
});

router.post("/recupero", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.password = createHash(password);
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("authCookie");
  res.redirect("/login");
});

router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { first_name, last_name, age } = req.body;
    const userId = req.user.id;

    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { first_name, last_name, age },
        { new: true }
      );

      const newToken = generateToken({
        id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        age: updatedUser.age,
        email: updatedUser.email,
        role: updatedUser.role,
        cart: updatedUser.cart,
      });

      res.cookie("authCookie", newToken, { maxAge: 3600000, httpOnly: true });

      res.redirect("/profile");
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar", error });
    }
  }
);

export default router;