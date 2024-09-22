import MemberPembelajaranView from "@/components/views/Member/Pembelajaran";
import orderServices from "@/services/order";
import pembelajaranServices from "@/services/pembelajaran";
import { useEffect, useState } from "react";

const MemberPembelajaranPage = () => {
    const [pembelajaran, setPembelajaran] = useState([]);
    const getAllPembelajaran = async () => {
      const { data } = await pembelajaranServices.getAllPembelajaran();
      setPembelajaran(data.data);
    };
    useEffect(() => {
      getAllPembelajaran();
    }, []);
  return <MemberPembelajaranView pembelajaran={pembelajaran}  />
};

export default MemberPembelajaranPage;
