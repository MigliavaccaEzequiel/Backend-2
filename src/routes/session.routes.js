import { Router } from "express";
import { createHash, isValidPassword } from "../utils/index.js";
import userModel from "../models/user.model.js";
import passport from 'passport';
import { generateToken } from "../utils/index.js";

const router = Router();

// rutas post
// registro
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }
  const password_hash = createHash(password);
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "El correo ya existe" });
    }
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: password_hash,
    };
    await userModel.create(newUser);
    res.status(201).redirect("/login");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", err: error.message });
  }
});
// router.post('/register',passport.authenticate('register',{failureRedirect:"failregister"}), async(req,res)=>{
//   res.redirect("/login")
// })

// router.get("/failregister", (req, res) => {
//   res
//     .status(400)
//     .send({ status: "error", message: "Error al registrar el usuario" });
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userExist = await userModel.findOne({ email: email });
//     if (userExist) {
//       const isValid = isValidPassword(password, userExist.password);
//       if (isValid) {
//         req.session.user = {
//           first_name: userExist.first_name,
//           last_name: userExist.last_name,
//           email: userExist.email,
//         };
//         res.redirect("/profile");
//       } else {
//         res.status(401).json({ message: "Error de credenciales" });
//       }
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error interno del servidor", err: error.message });
//   }
// });

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      return res.status(401).json({ message: "Error de credenciales" });
    }

    const isValid = isValidPassword(password, userExist.password);
    if (!isValid) {
      return res.status(401).json({ message: "Error de credenciales" });
    }

    const userPayload = {
      id: userExist._id,
      first_name: userExist.first_name,
      last_name: userExist.last_name,
      age: userExist.age,
      email: userExist.email,
      role: userExist.role,
    };

    const token = generateToken(userPayload);

    res.cookie("authCookie", token, { maxAge: 3600000, httpOnly: true });
    return res.redirect("/profile");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor", err: error.message });
  }
});

// recupero de pass
router.post("/recupero", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const userFound = await userModel.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const password_hash = createHash(password);
    userFound.password = password_hash;
    await userFound.save();
    res.redirect("/login");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", err: error.message });
  }
});

// cerrar sesion
router.post("/logout", (req, res) => {
  res.clearCookie("authCookie");
  res.redirect("/login");
});

// editar informacion
router.put("/edit", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { first_name, last_name, age } = req.body;
  const userId = req.user.user.id;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { first_name, last_name, age },
      { new: true }
    );

    const userPayload = {
      id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      age: updatedUser.age,
      email: updatedUser.email,
      role: updatedUser.role
    };

    const newToken = generateToken(userPayload);
    res.cookie("authCookie", newToken, { maxAge: 3600000, httpOnly: true });

    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
  }
});

export default router;