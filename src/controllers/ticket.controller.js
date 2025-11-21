import ticketService from "../services/ticket.service.js";

class TicketController {
  createTicket = async (req, res) => {
    try {
      const { amount, purchaser } = req.body;
      const ticket = await ticketService.createTicket(amount, purchaser);
      res.status(201).json({ status: "success", payload: ticket });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };
}

export default new TicketController();