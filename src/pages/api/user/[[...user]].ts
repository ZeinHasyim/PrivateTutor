import { deleteData, retriveData, retriveDataByField, retriveDataById, updateData } from "@/lib/firebase/service";
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
    verifyLocal(req, res, true, async () => {
        const { user }: any = req.query;
        if (user && user[0] == 'profiles') {
            const data = await retriveDataByField("users", "role", "guru");
            responseApiSuccess(res, data);
        } else if (user && user[0] == 'profile-aproved') {
            const data = await retriveDataByField("users", "profile_status", "Aprove");
            responseApiSuccess(res, data);
        } else if(user && user[0]) {
            const data = await retriveDataById("users", user[0]);
            responseApiSuccess(res, data);
        } else{
            const users = await retriveData("users");
            const data = users.map((user: any) => {
              delete user.password;
              return user;
            });
            responseApiSuccess(res, data);
        }
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { user } = req.query;
      const { data } = req.body;

      await updateData("users", `${user}`, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    verify(req, res, true, async () => {
      await deleteData("users", `${id}`, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    console.log(res);

    // responseApiMethodNotAllowed(res);
  }
}
