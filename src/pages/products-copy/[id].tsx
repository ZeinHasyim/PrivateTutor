import DetailProductView from "@/components/views/DetailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
  const { id } = useRouter().query;
  const session: any = useSession();
  const [product, setProduct] = useState<Product | {}>({});
  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <DetailProductView
        product={product}
        productId={id}
      />
    </>
  );
};

export default DetailProductPage;
