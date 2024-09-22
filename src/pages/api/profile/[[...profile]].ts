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
    if (req.method == "GET") {
        verifyLocal(req, res, true, async (token: any) => {

            const { profile }: any = req.query;

            if (profile && profile[0] == 'aproved') {
                const data = await retriveDataByField("profiles","status", "Aprove");
                responseApiSuccess(res, data);
            } else if (profile && profile[0] == 'user' && profile[1]) {
                const data = await retriveDataByField("profiles","user_id", profile[1]);
                responseApiSuccess(res, data);
            } else if (profile && profile[0] == 'detail-by-id' && profile[1]) {
                const data = await retriveDataByField("profiles","user_id", profile[1]);
                responseApiSuccess(res, data[0]);
            } else if (profile && profile[0]) {
                const data = await retriveDataById("profiles", profile[0]);
                responseApiSuccess(res, data);
            } else {
                let data;
                data = token.role === "guru" ? await retriveDataByField("profiles", "user_id", token.id) : await retriveData("profiles");
                responseApiSuccess(res, data);
            }
        });

    } else if (req.method === "POST") {
        verify(req, res, true, async (token: any) => {
            let data = req.body;
            data.created_at = new Date();
            data.updated_at = new Date();
            data.price = parseInt(data.price);
            data.user_id = token.id;
            data.guru = token.fullname;
            data.status = "waiting";
            await addData("profiles", data, (status: boolean, result: any) => {
                if (status) {
                    responseApiSuccess(res, { id: result.id });
                } else {
                    responseApiFailed(res);
                }
            });
        });
    } else if (req.method === "PUT") {
        verify(req, res, true, async () => {
            const { profile }: any = req.query;
            const { data } = req.body;
            await updateData("profiles", profile[0], data, (status: boolean) => {
                if (status) {
                    responseApiSuccess(res);
                } else {
                    responseApiFailed(res);
                }
            });
        });
    } else if (req.method === "DELETE") {
        verify(req, res, true, async () => {
            const { profile }: any = req.query;
            await deleteData("profiles", profile[0], (result: boolean) => {
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
