import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.post("/", authorization(['admin', 'user']), ticketController.createTicket);

export default router;