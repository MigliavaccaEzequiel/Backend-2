import cartService from "../services/cart.service.js";
import ticketService from "../services/ticket.service.js";

class CartsController {
  getCarts = async (req, res) => {
    try {
      const carts = await cartService.getCarts();
      res.json({ status: "success", payload: carts });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  getMyCart = async (req, res) => {
    try {
      const cart = await cartService.getCartById(req.user.cart);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  };

  getCartById = async (req, res) => {
    try {
      const cart = await cartService.getCartById(req.params.cid);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  };

  createCart = async (req, res) => {
    try {
      const cart = await cartService.createCart();
      res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  addProduct = async (req, res) => {
    try {
      const cid = req.user.cart;
      const quantity = req.body.quantity || 1;
      const updated = await cartService.addProduct(cid, req.params.pid, quantity);
      res.json({ status: "success", payload: updated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  updateQuantity = async (req, res) => {
    try {
      const { quantity } = req.body;
      const updated = await cartService.updateProductQuantity(
        req.params.cid,
        req.params.pid,
        quantity
      );
      res.json({ status: "success", payload: updated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  removeProduct = async (req, res) => {
    try {
      const updated = await cartService.removeProduct(req.user.cart, req.params.pid);
      res.json({ status: "success", payload: updated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  emptyCart = async (req, res) => {
    try {
      const updated = await cartService.emptyCart(req.user.cart);
      res.json({ status: "success", payload: updated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  purchase = async (req, res) => {
    try {
      const user = req.user;
      const cart = await cartService.getCartById(user.cart);

      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ status: "error", message: "Carrito vacío" });
      }

      for (let p of cart.products) {
        if (p.quantity > p.product.stock) {
          return res.status(400).json({ 
            status: "error", 
            message: `No hay suficiente stock para el producto ${p.product.title}` 
          });
        }
      }

      const ticket = await ticketService.createTicket(cart, user.email);

      await cartService.emptyCart(user.cart);

      return res.json({ status: "success", payload: ticket });

    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

}

export default new CartsController();