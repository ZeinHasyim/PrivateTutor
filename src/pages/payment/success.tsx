import SuccessView from "@/components/views/Payment/Success";
import { ToasterContext } from "@/contexts/ToasterContext";
import transactionServices from "@/services/payment";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const PaymentSuccessPage = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const checkPayment = async () => {
  };
  console.log(query);

  useEffect(() => {
    if (isReady) {
      console.log('dsd');
    }
  }, [isReady]);
  return (
    <>
      <SuccessView />
    </>
  );
};

export default PaymentSuccessPage;
