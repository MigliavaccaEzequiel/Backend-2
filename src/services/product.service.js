import ProductDAO from "../dao/classes/product.dao.js";
import ProductRepository from "../repository/product.repository.js";

const productDAO = new ProductDAO();
const productRepository = new ProductRepository(productDAO);

class ProductService {
  getProducts = async () => await productRepository.getProducts();

  getProductById = async (id) => await productRepository.getProductById(id);

  createProduct = async (data) => await productRepository.createProduct(data);

  updateProduct = async (id, data) =>
    await productRepository.updateProduct(id, data);

  deleteProduct = async (id) =>
    await productRepository.deleteProduct(id);
}

export default new ProductService();