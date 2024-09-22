import jwt, { Jwt } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { responseApiAccessDenied } from "./responseApi";


export const verify = (
  req: NextApiRequest,
  res: NextApiResponse,
  isAdmin: boolean,
  callback: Function
) => {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (token) {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        console.log("testing", decoded.role);
        if (decoded && (isAdmin ? decoded.role === "guru" || decoded.role === "admin" || decoded.role ==='member': true)) {
          callback(decoded);
        } else {
            responseApiAccessDenied(res);
        }
      }
    );
  } else {
    responseApiAccessDenied(res);
  }
};

export const verifyLocal = (
  req: NextApiRequest,
  res: NextApiResponse,
  isAdmin: boolean,
  callback: Function
) => {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (token) {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
          if (err) {
            callback(res);
          } else {
            callback(decoded);
          }

      }
    );
  } else {
    callback(true);
  }
};
