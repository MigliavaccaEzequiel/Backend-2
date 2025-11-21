import usersService from "../services/users.service.js";

class UsersController {

  getUsers = async (req, res) => {
    try {
      const users = await usersService.getUsers();
      res.status(200).json({ message: "Todos los usuarios", payload: users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await usersService.getUserById(uid);
      res.status(200).json({ message: "Usuario encontrado", payload: user });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const newUser = await usersService.createUser(req.body);
      res.status(201).json({ message: "Usuario creado", payload: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const updatedUser = await usersService.updateUser(req.params.uid, req.body);
      res.status(200).json({ message: "Usuario actualizado", payload: updatedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      await usersService.deleteUser(req.params.uid);
      res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

}

export default new UsersController();