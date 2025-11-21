import UsersDAO from "../dao/classes/users.dao.js";

class UsersRepository {

  getUsers = async () => {
    return await UsersDAO.getUsers();
  };

  getUserById = async (id) => {
    return await UsersDAO.getUserById(id);
  };

  getUserByEmail = async (email) => {
    return await UsersDAO.getUserByEmail(email);
  };

  createUser = async (data) => {
    return await UsersDAO.createUser(data);
  };

  updateUser = async (id, data) => {
    return await UsersDAO.updateUser(id, data);
  };

  deleteUser = async (id) => {
    return await UsersDAO.deleteUser(id);
  };

}

export default new UsersRepository();