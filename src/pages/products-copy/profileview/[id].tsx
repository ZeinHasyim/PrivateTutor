import DetailProfileView from "@/components/views/DetailProfile"; // Ganti dengan komponen DetailProfileView
import certificatesServices from "@/services/profiles";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProfilePage = () => {
    const { id } = useRouter().query;
    const session: any = useSession();
    const [user, setUser] = useState<User | {}>({});
    const [certificates, setCertificates] = useState([]);

    const getDetailUser = async (id: string) => {
        const { data } = await userServices.getUserById(id); // Pastikan layanan ini ada
        setUser(data.data);
    };
    const getCertificates = async (id: string) => {
        const { data } = await certificatesServices.getAllCertificatesByUser(id); // Pastikan layanan ini ada
        setCertificates(data.data);
    };

    useEffect(() => {
        if (id) {
            getDetailUser(id as string);
        }
    }, [id]);

    useEffect(() => {
        getCertificates(id as string);
    }, [id]);


    return (
        <>
            <Head>
                <title>User Detail</title>
            </Head>
            <DetailProfileView profile={user} certificates={certificates} />
        </>
    );
};

export default DetailProfilePage;
