import sessionService from "../services/session.service.js";

class SessionController {
  register = async (req, res) => {
    try {
      const result = await sessionService.register(req.user);
      res.redirect("/login");
    } catch (error) {
      console.error("Error al crear carrito:", error);
      res.status(500).send("Error al crear carrito del usuario");
    }
  };

  failRegister = (req, res) => {
    res.status(400).send("Error al registrar usuario");
  };

  login = async (req, res) => {
    try {
      const response = await sessionService.login(req.body);
      res.cookie("authCookie", response.token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.redirect("/profile");
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  recupero = async (req, res) => {
    try {
      await sessionService.recupero(req.body);
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({ message: "Error interno", error });
    }
  };

  logout = (req, res) => {
    res.clearCookie("authCookie");
    res.redirect("/login");
  };

  edit = async (req, res) => {
    try {
      const { updatedUser, newToken } = await sessionService.edit(req.user.id, req.body);

      res.cookie("authCookie", newToken, {
        maxAge: 3600000,
        httpOnly: true,
      });

      res.redirect("/profile");
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar", error });
    }
  };
}

export default new SessionController();