// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { responseApiSuccess } from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  responseApiSuccess(res);
}
