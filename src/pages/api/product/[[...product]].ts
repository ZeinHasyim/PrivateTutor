import { retriveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const data = await retriveData("products");
    res
      .status(200)
      .json({
        status: true,
        statusCode: 200,
        message: "success",
        data,
      });
  }
}
