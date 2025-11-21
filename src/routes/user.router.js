import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.get("/", authorization(['admin']), usersController.getUsers);

router.get("/:uid", authorization(['admin']), usersController.getUserById);

router.post("/", usersController.createUser);

router.put("/:uid", authorization(['user']), usersController.updateUser);

router.delete("/:uid", authorization(['admin']), usersController.deleteUser);

export default router;