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
      const { product }: any = req.query;
      if (product && product[0]) {
        const data = await retriveDataById("products", product[0]);
        responseApiSuccess(res, data);
      } else {
        let data;
        data = token.role === "admin" ? await retriveDataByField("products", "user_id", token.id) : await retriveData("products") ;
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
      data.username = token.fullname;
      await addData("products", data, (status: boolean, result: any) => {
        if (status) {
          responseApiSuccess(res, { id: result.id });
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { product }: any = req.query;
      const { data } = req.body;
      await updateData("products", product[0], data, (status: boolean) => {
        if (status) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { product }: any = req.query;
      await deleteData("products", product[0], (result: boolean) => {
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
