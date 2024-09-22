import GuruPembelajaranView from "@/components/views/Guru/Pembelajaran";
import pembelajaranServices from "@/services/pembelajaran";
import { useEffect, useState } from "react";

const MemberPembelajaranPage = () => {
    const [pembelajaran, setPembelajaran] = useState([]);
    const getAllPembelajaran = async () => {
      const { data } = await pembelajaranServices.getAllPembelajaran();
      const filteredPembelajaran = data.data.filter(
        (data : any) =>
            data.status_pay !== "not pay"
    );
    console.log(data.data);

      setPembelajaran(filteredPembelajaran);
    };
    useEffect(() => {
      getAllPembelajaran();
    }, []);
  return <GuruPembelajaranView pembelajaran={pembelajaran}  />
};

export default MemberPembelajaranPage;
