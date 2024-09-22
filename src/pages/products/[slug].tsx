import ProductView from "@/components/views/Products";
import SubCategoryView from "@/components/views/Products/subs";
import productServices from "@/services/product";
import profilesServices from "@/services/profiles";
import userServices from "@/services/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductPage = () => {
    const { slug } = useRouter().query;
    const [gurus, setGurus] = useState([]);
    const getAllGurus = async () => {
        const { data } = await userServices.getUserAproved();
        const gurus = data.data;
        const filteredCategory = gurus.filter(
            (guru : any) =>
                guru.profile.category === slug
        );
        setGurus(filteredCategory);
    };
  useEffect(() => {
    getAllGurus();
  }, [getAllGurus]);
  return (
    <>
      <Head>
        <title>Guru</title>
      </Head>
      <SubCategoryView gurus={gurus} category={slug}/>
    </>
  );
};
export default ProductPage;
