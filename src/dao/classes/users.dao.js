import userModel from "../models/user.model.js";

class UsersDAO {

  getUsers = async () => {
    return await userModel.find();
  };

  getUserById = async (id) => {
    return await userModel.findById(id);
  };

  getUserByEmail = async (email) => {
    return await userModel.findOne({ email });
  };

  createUser = async (data) => {
    return await userModel.create(data);
  };

  updateUser = async (id, data) => {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  };

  deleteUser = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };

}

export default new UsersDAO();