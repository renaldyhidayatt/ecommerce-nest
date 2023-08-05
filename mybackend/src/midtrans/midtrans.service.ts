import { Injectable, NotFoundException } from '@nestjs/common';
import snap from 'src/utils/midtrans';
import { MidtransDto } from './midtrans.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MidtransService {
  async createTransaction(dto: MidtransDto) {
    try {
      let parameter = {
        transaction_details: {
          order_id: 'order-csb-' + uuidv4(),
          gross_amount: dto.gross_amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: dto.firstname,
          last_name: dto.lastname,
          email: dto.email,
          phone: dto.phone,
        },
        callbacks: {
          finish: 'http://localhost:3000/order',
        },
      };
      return snap
        .createTransaction(parameter)
        .then((transaction) => {
          console.log(transaction);
          return transaction;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }
}
