import productModel from "../models/product.model.js";

export default class ProductDAO {
  getAll = async () => await productModel.find();

  getById = async (pid) => await productModel.findById(pid);

  create = async (product) => await productModel.create(product);

  update = async (pid, data) =>
    await productModel.findByIdAndUpdate(pid, data, { new: true });

  delete = async (pid) => await productModel.findByIdAndDelete(pid);
}