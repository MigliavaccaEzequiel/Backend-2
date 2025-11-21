import ticketDAO from "../dao/classes/ticket.dao.js";

class TicketRepository {
  createTicket = async (data) => {
    return await ticketDAO.createTicket(data);
  };
}

export default new TicketRepository();