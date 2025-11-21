import ticketRepository from "../repository/ticket.repository.js";
import { v4 as uuidv4 } from "uuid";

class TicketService {
  createTicket = async (cart, purchaserEmail) => {
    let total = 0;

    const products = cart.products.map(p => {
      total += p.product.price * p.quantity;
      return {
        product: p.product._id,
        quantity: p.quantity,
        price: p.product.price
      };
    });

    const ticketData = {
      code: uuidv4(),
      products,
      total,
      purchaser: purchaserEmail
    };

    return await ticketRepository.createTicket(ticketData);
  };
}

export default new TicketService();