import InvoiceView from "@/components/views/Invoice";
import pembelajaranServices from "@/services/pembelajaran";
import { Pembelajaran } from "@/types/pembelajaran.type";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const InvoicePage = () => {
    const { id } = useRouter().query;
    const [pembelajaran, setPembelajaran] = useState<Pembelajaran | {}>({});
    const getDetailPembelajaran = async (id: string) => {
        const { data } = await pembelajaranServices.getDetailPembelajaran(id);
        setPembelajaran(data.data[0]);
    };

    useEffect(() => {
        getDetailPembelajaran(id as string);
      }, [id]);
    return (
        <>
            <InvoiceView pembelajaran={pembelajaran}/>
        </>
    );
};

export default InvoicePage;
