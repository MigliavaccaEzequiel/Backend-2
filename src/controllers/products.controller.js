import productService from "../services/product.service.js";

class ProductController {
  getProducts = async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).json({ status: "success", payload: products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.pid);
      if (!product) return res.status(404).json({ message: "Producto no encontrado" });
      res.status(200).json({ status: "success", payload: product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createProduct = async (req, res) => {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const updated = await productService.updateProduct(req.params.pid, req.body);
      res.status(200).json({ status: "success", payload: updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      await productService.deleteProduct(req.params.pid);
      res.status(200).json({ status: "success", message: "Producto eliminado" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default new ProductController();