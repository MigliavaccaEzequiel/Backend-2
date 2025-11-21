import cartDAO from "../dao/classes/cart.dao.js";

class CartRepository {
  getCarts = async () => {
    return await cartDAO.getCarts();
  };

  getCartById = async (cid) => {
    return await cartDAO.getCartById(cid);
  };

  createCart = async () => {
    return await cartDAO.createCart();
  };

  addProduct = async (cid, pid, quantity = 1) => {
    return await cartDAO.addProduct(cid, pid, quantity);
  };

  updateProductQuantity = async (cid, pid, quantity) => {
    return await cartDAO.updateProductQuantity(cid, pid, quantity);
  };

  removeProduct = async (cid, pid) => {
    return await cartDAO.removeProduct(cid, pid);
  };

  emptyCart = async (cid) => {
    return await cartDAO.emptyCart(cid);
  };
}

export default new CartRepository();