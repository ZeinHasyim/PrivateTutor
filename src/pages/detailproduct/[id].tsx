import DetailProductView from "@/components/views/DetailProduct";
import productServices from "@/services/product";
import profilesServices from "@/services/profiles";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { Profile } from "@/types/profile.type";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
  const { id } = useRouter().query;
  const session: any = useSession();
  const [profile, setProfile] = useState<Profile | {}>({});
  const [guru, setGuru] = useState<User | {}>({});
  const getDetailProfile = async (id: string) => {
      const { data } = await profilesServices.getDetailProfileByUser(id);
      setProfile(data.data);
    };
    const getDetailUser = async (id: string) => {
      const { data } = await userServices.getUserById(id);
      setGuru(data.data);
    };

  useEffect(() => {
    getDetailProfile(id as string);
    getDetailUser(id as string);
  }, [id]);

  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <DetailProductView
        guru={guru}
        guruId={id}
      />
    </>
  );
};

export default DetailProductPage;
