import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { authorization } from "../middlewares/authorization.js";


const router = Router();

router.get("/mine", authorization(['user','admin']), cartsController.getMyCart);

router.get("/", authorization(['admin']), cartsController.getCarts);

router.post("/product/:pid", authorization(['user']), cartsController.addProduct);

router.put("/product/:pid", authorization(['user']), cartsController.updateQuantity);

router.delete("/product/:pid", authorization(['user']), cartsController.removeProduct);

router.delete("/empty", authorization(['user']), cartsController.emptyCart);

router.post("/:cid/purchase", authorization(["user"]), cartsController.purchase);

export default router;