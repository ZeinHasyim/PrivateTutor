import ProductView from "@/components/views/Products";
import SubCategoryView from "@/components/views/Products/subs";
import productServices from "@/services/product";
import profilesServices from "@/services/profiles";
import userServices from "@/services/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

const ProductPage = () => {
  const { slug } = useRouter().query;
  const [gurus, setGurus] = useState([]);

  // Use useCallback to memoize the function and avoid recreating it on every render
  const getAllGurus = useCallback(async () => {
    const { data } = await userServices.getUserAproved();
    const gurus = data.data;
    const filteredCategory = gurus.filter((guru: any) => guru.profile.category === slug);
    setGurus(filteredCategory);
  }, [slug]); // Add slug as a dependency

  useEffect(() => {
    getAllGurus();
  }, [getAllGurus]); // Now getAllGurus is stable and doesn't cause unnecessary re-renders

  return (
    <>
      <Head>
        <title>Guru</title>
      </Head>
      <SubCategoryView gurus={gurus} category={slug} />
    </>
  );
};

export default ProductPage;
