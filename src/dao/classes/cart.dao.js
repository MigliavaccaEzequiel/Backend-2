import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

class CartDAO {
  getCarts = async () => {
    return await CartModel.find().populate("products.product");
  };

  getCartById = async (cid) => {
    return await CartModel.findById(cid).populate("products.product");
  };

  createCart = async () => {
    return await CartModel.create({ products: [] });
  };

  addProduct = async (cid, pid, quantity = 1) => {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    const product = await ProductModel.findById(pid);
    if (!product) throw new Error("Producto no encontrado");

    const existing = cart.products.find(p => p.product.toString() === pid);

    if (existing) {
      if (existing.quantity + quantity > product.stock) {
        throw new Error(`No hay suficiente stock. Disponible: ${product.stock}`);
      }
      existing.quantity += quantity;
    } else {
      if (quantity > product.stock) {
        throw new Error(`No hay suficiente stock. Disponible: ${product.stock}`);
      }
      cart.products.push({ product: pid, quantity });
    }

    return await cart.save();
  };

  updateProductQuantity = async (cid, pid, quantity) => {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    const product = cart.products.find(p => p.product.toString() === pid);
    if (!product) return null;

    product.quantity = quantity;

    return await cart.save();
  };

  removeProduct = async (cid, pid) => {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== pid);

    return await cart.save();
  };

  emptyCart = async (cid) => {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    cart.products = [];

    return await cart.save();
  };
}

export default new CartDAO();