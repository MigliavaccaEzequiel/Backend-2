export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async () => await this.dao.getAll();

  getProductById = async (id) => await this.dao.getById(id);

  createProduct = async (data) => await this.dao.create(data);

  updateProduct = async (id, data) => await this.dao.update(id, data);

  deleteProduct = async (id) => await this.dao.delete(id);
}