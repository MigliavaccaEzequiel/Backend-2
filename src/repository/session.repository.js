import sessionDAO from "../dao/classes/session.dao.js";

class SessionRepository {
  register = async (user) => {
    return await sessionDAO.register(user);
  };

  getUserByEmail = async (email) => {
    return await sessionDAO.getUserByEmail(email);
  };

  updateUser = async (id, data) => {
    return await sessionDAO.updateUser(id, data);
  };
}

export default new SessionRepository();