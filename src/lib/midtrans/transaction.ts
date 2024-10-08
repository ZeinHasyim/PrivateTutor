import snap from "./init";

const createTransaction = async (params: any, callback: Function) => {
  snap
    .createTransaction(params)
    .then((transaction: { token: string; redirect_url: string }) => {
      callback(transaction);
    });
};

const getTransaction = async (token: string, callback: Function) => {
  snap.transaction.status(token).then((result: any) => {
    callback(result);
  });
};

export  { createTransaction, getTransaction };
