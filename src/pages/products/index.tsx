import ProductView from "@/components/views/Products";
import productServices from "@/services/product";
import profilesServices from "@/services/profiles";
import userServices from "@/services/user";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProductPage = () => {
    const [gurus, setGurus] = useState([]);
    const getAllGurus = async () => {
        const { data } = await userServices.getUserAproved();
        setGurus(data.data);

    };
  useEffect(() => {
    getAllGurus();
  }, []);
  return (
    <>
      <Head>
        <title>Guru</title>
      </Head>
      <ProductView gurus={gurus}/>
    </>
  );
};
export default ProductPage;
