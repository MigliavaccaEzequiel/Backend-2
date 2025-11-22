import cartRepository from "../repository/cart.repository.js";
import productRepository from "../repository/product.repository.js";
import ticketService from "./ticket.service.js";

class CartService {
  getCarts = async () => {
    return await cartRepository.getCarts();
  };

  getCartById = async (cid) => {
    const cart = await cartRepository.getCartById(cid);
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  };

  createCart = async () => cartRepository.createCart();

  addProduct = async (cid, pid, quantity = 1) => {
    const updated = await cartRepository.addProduct(cid, pid, quantity);
    if (!updated) throw new Error("No se pudo agregar el producto");
    return updated;
  };

  updateProductQuantity = async (cid, pid, quantity) => {
    const updated = await cartRepository.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    if (!updated) throw new Error("No se pudo actualizar la cantidad");
    return updated;
  };

  removeProduct = async (cid, pid) => {
    const updated = await cartRepository.removeProduct(cid, pid);
    if (!updated) throw new Error("No se pudo eliminar el producto");
    return updated;
  };

  emptyCart = async (cid) => {
    const updated = await cartRepository.emptyCart(cid);
    if (!updated) throw new Error("No se pudo vaciar el carrito");
    return updated;
  };

  // ========================================================
  // COMPRA PARCIAL PROFESIONAL
  // ========================================================
  purchase = async (user) => {
    const cart = await this.getCartById(user.cart);

    if (!cart || cart.products.length === 0) {
      throw new Error("El carrito está vacío");
    }

    let totalAmount = 0;
    let productosSinStock = [];
    let productosComprados = [];

    for (let item of cart.products) {
      const product = await productRepository.getProductById(
        item.product._id
      );

      if (!product) continue;

      if (product.stock === 0) {
        // producto sin stock → mantener pero con cantidad 0
        item.quantity = 0;
        productosSinStock.push({
          product: product._id,
          requested: item.quantity,
          available: 0,
        });
        continue;
      }

      // Ajustamos la cantidad al stock AVAILABLE
      const quantityToBuy = Math.min(item.quantity, product.stock);

      if (quantityToBuy < item.quantity) {
        productosSinStock.push({
          product: product._id,
          requested: item.quantity,
          available: product.stock,
        });
      }

      // Descontar stock real
      product.stock -= quantityToBuy;
      await product.save();

      // Contabilizar compra
      totalAmount += product.price * quantityToBuy;

      productosComprados.push({
        product: product._id,
        quantity: quantityToBuy,
      });

      // Ajustamos carrito a la cantidad REAL
      item.quantity = product.stock === 0 ? 0 : product.stock;
    }

    // Guardamos carrito con cantidades actualizadas
    await cart.save();

    // Generar ticket
    const ticket = await ticketService.createTicket(
      { products: productosComprados, total: totalAmount },
      user.email
    );

    return {
      ticket,
      productosSinStock,
    };
  };
}

export default new CartService();