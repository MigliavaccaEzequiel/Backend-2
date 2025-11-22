import cartDAO from "../dao/classes/cart.dao.js";

class CartRepository {
  getCarts = async () => cartDAO.getCarts();

  getCartById = async (cid) => cartDAO.getCartById(cid);

  createCart = async () => cartDAO.createCart();

  addProduct = async (cid, pid, quantity) =>
    cartDAO.addProduct(cid, pid, quantity);

  updateProductQuantity = async (cid, pid, quantity) =>
    cartDAO.updateProductQuantity(cid, pid, quantity);

  removeProduct = async (cid, pid) =>
    cartDAO.removeProduct(cid, pid);

  emptyCart = async (cid) =>
    cartDAO.emptyCart(cid);
}

export default new CartRepository();