import TicketModel from "../models/ticket.model.js";

class TicketDAO {
  createTicket = async (data) => {
    return await TicketModel.create(data);
  };
}

export default new TicketDAO();