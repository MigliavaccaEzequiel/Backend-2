import cartRepository from "../repository/cart.repository.js";

class CartService {
  getCarts = async () => {
    return await cartRepository.getCarts();
  };

  getCartById = async (cid) => {
    const cart = await cartRepository.getCartById(cid);
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  };

  createCart = async () => {
    return await cartRepository.createCart();
  };

  addProduct = async (cid, pid, quantity = 1) => {
    const updated = await cartRepository.addProduct(cid, pid, quantity);
    if (!updated) throw new Error("No se pudo agregar el producto");
    return updated;
  }

  updateProductQuantity = async (cid, pid, quantity) => {
    const updated = await cartRepository.updateProductQuantity(cid, pid, quantity);
    if (!updated) throw new Error("No se pudo actualizar la cantidad");
    return updated;
  };

  removeProduct = async (cid, pid) => {
    const updated = await cartRepository.removeProduct(cid, pid);
    if (!updated) throw new Error("No se pudo eliminar el producto");
    return updated;
  };

  emptyCart = async (cid) => {
    const result = await cartRepository.emptyCart(cid);
    if (!result) throw new Error("No se pudo vaciar el carrito");
    return result;
  };
}

export default new CartService();