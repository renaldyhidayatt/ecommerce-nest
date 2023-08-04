import { Injectable, NotFoundException } from '@nestjs/common';
import snap from 'src/utils/midtrans';
import { MidtransDto } from './midtrans.dto';

@Injectable()
export class MidtransService {
  async createTransaction(dto: MidtransDto) {
    try {
      let parameter = {
        transaction_details: {
          order_id: 'order-csb-' + Math.round(new Date().getTime() / 1000),
          gross_amount: dto.gross_amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: dto.firstname,
          last_name: dto.lastName,
          email: dto.email,
          phone: dto.phone,
        },
        callbacks: {
          finish: 'http://localhost:3000/orders',
        },
      };
      return snap.createTransaction(parameter).then((transaction) => {
        console.log(transaction);
        return transaction;
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
