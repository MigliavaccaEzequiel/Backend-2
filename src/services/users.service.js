import usersRepository from "../repository/users.repository.js";
import UserDTO from "../dto/user.dto.js";
import { createHash } from "../utils/index.js";

class UsersService {

  getUsers = async () => {
    const users = await usersRepository.getUsers();
    if (!users.length) throw new Error("No hay usuarios cargados");

    return users.map(u => new UserDTO(u));
  };

  getUserById = async (id) => {
    const user = await usersRepository.getUserById(id);
    if (!user) throw new Error("Usuario no encontrado");

    return new UserDTO(user);
  };

  getUserByEmail = async (email) => {
    const user = await usersRepository.getUserByEmail(email);
    return user ? new UserDTO(user) : null;
  };

  createUser = async (data) => {
    const { first_name, last_name, email, age, password } = data;

    if (!first_name || !last_name || !email || !age || !password) {
      throw new Error("Faltan datos obligatorios");
    }

    const hashedPassword = createHash(password);

    const newUser = await usersRepository.createUser({
      ...data,
      password: hashedPassword
    });

    return new UserDTO(newUser);
  };

  updateUser = async (id, data) => {
    const user = await usersRepository.updateUser(id, data);
    if (!user) throw new Error("Usuario no encontrado");

    return new UserDTO(user);
  };

  deleteUser = async (id) => {
    const user = await usersRepository.deleteUser(id);
    if (!user) throw new Error("Usuario no encontrado");

    return true;
  };

}

export default new UsersService();