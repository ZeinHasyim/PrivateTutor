import {
    addData,
    deleteData,
    retriveData,
    retriveDataByField,
    retriveDataById,
    updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify, verifyLocal } from "@/utils/verifyToken";
import {
    responseApiFailed,
    responseApiMethodNotAllowed,
    responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        verifyLocal(req, res, true, async (token: any) => {
            const { order }: any = req.query;
            if (order && order[0]) {
                const data = await retriveDataByField("orders","orderIdx", order[0]);
                responseApiSuccess(res, data);
            } else {
                let data;
                if (token.role === 'guru') {
                    data = await retriveDataByField("pembelajaran", "teacher_id", token.id)
                } else if (token.role === 'member') {
                    data = await retriveDataByField("pembelajaran", "member_id", token.id)
                } else{
                    data = await retriveData("pembelajaran")
                }
                responseApiSuccess(res, data);
            }
        });
    }
    else if (req.method === "POST") {
        verify(req, res, true, async (token: any) => {
            let data = req.body;
            data.created_at = new Date();
            data.updated_at = new Date();
            await addData("pembelajaran", data, (status: boolean, result: any) => {
                if (status) {
                    responseApiSuccess(res, { id: result.id });
                } else {
                    responseApiFailed(res);
                }
            });
        });
    } else if (req.method === "PUT") {
        verify(req, res, true, async () => {
            const { pembelajaran }: any = req.query;
            const { data } = req.body;
            await updateData("pembelajaran", pembelajaran[0], data, (status: boolean) => {
                if (status) {
                    responseApiSuccess(res);
                } else {
                    responseApiFailed(res);
                }
            });
        });
    } else if (req.method === "DELETE") {
        verify(req, res, true, async () => {
            const { order }: any = req.query;
            await deleteData("orders", order[0], (result: boolean) => {
                if (result) {
                    responseApiSuccess(res);
                } else {
                    responseApiFailed(res);
                }
            });
        });
    } else {
        responseApiMethodNotAllowed(res);
    }
}
