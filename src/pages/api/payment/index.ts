// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retriveData, retriveDataByField, retriveDataById, updateData } from "@/lib/firebase/service";
import { createTransaction } from "@/lib/midtrans/transaction";
import { responseApiNotFound, responseApiSuccess } from "@/utils/responseApi";
import { verify, verifyLocal } from "@/utils/verifyToken";
import { arrayUnion } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        verify(req, res, false, async (decoded: { id: string }) => {
            const payload = req.body;
            const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
            const params = {
                transaction_details: {
                    order_id: payload.transaction.order_id,
                    gross_amount: payload.transaction.total,
                },
                customer_details: {
                    first_name: payload.user.fullname,
                    email: payload.user.email,
                    phone: payload.user.phone,
                    shipping_address: {
                        first_name: payload.user.address.recipient,
                        phone: payload.user.address.phone,
                        address: payload.user.address.addressLine,
                    },
                    item_details: payload.transaction.items,
                },
            };
            createTransaction(
                params,
                async (transaction: { token: string; redirect_url: string }) => {
                    responseApiSuccess(res, {transaction, generateOrderId})
                }
            );
        });
    }
}
