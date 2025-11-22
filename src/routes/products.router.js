import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.get("/", authorization(["admin", "user"]), productsController.getProducts);

router.get("/:pid", authorization(["admin", "user"]), productsController.getProductById);

router.post("/", authorization(["admin"]), productsController.createProduct);

router.put("/:pid", authorization(["admin"]), productsController.updateProduct);

router.delete("/:pid", authorization(["admin"]), productsController.deleteProduct);

export default router;