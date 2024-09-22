import instance from "@/lib/axios/instance";
import { getTransaction } from "@/lib/midtrans/transaction";

const endpoint = {
  transaction: "/api/payment",
};

const PaymentServices = {
  createPayment: (data: any) => instance.post(endpoint.transaction, data),
};

export default PaymentServices;
