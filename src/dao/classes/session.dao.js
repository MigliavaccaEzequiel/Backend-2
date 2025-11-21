import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";

class SessionDAO {
  register = async (user) => {
    const newCart = await cartModel.create({ products: [] });
    user.cart = newCart._id;
    return await user.save();
  };

  getUserByEmail = async (email) => {
    return await userModel.findOne({ email });
  };

  updateUser = async (id, data) => {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  };
}

export default new SessionDAO();