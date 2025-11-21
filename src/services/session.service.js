import sessionRepository from "../repository/session.repository.js";
import { isValidPassword, generateToken, createHash } from "../utils/index.js";

class SessionService {
  register = async (user) => {
    return await sessionRepository.register(user);
  };

  login = async (data) => {
    const { email, password } = data;
    const user = await sessionRepository.getUserByEmail(email);

    if (!user) throw { status: 401, message: "Error de credenciales" };
    if (!isValidPassword(password, user.password))
      throw { status: 401, message: "Error de credenciales" };

    const token = generateToken({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
      role: user.role,
      cart: user.cart,
    });

    return { token };
  };

  recupero = async (data) => {
    const { email, password } = data;

    const user = await sessionRepository.getUserByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    user.password = createHash(password);
    await user.save();
  };

  edit = async (userId, body) => {
    const updatedUser = await sessionRepository.updateUser(userId, body);

    const newToken = generateToken({
      id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      age: updatedUser.age,
      email: updatedUser.email,
      role: updatedUser.role,
      cart: updatedUser.cart,
    });

    return { updatedUser, newToken };
  };
}

export default new SessionService();