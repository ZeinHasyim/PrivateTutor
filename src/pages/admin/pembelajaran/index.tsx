import AdminPembelajaranView from "@/components/views/Admin/Pembelajaran";
import GuruPembelajaranView from "@/components/views/Guru/Pembelajaran";
import pembelajaranServices from "@/services/pembelajaran";
import { useEffect, useState } from "react";

const AdminPembelajaranPage = () => {
    const [pembelajaran, setPembelajaran] = useState([]);
    const getAllPembelajaran = async () => {
      const { data } = await pembelajaranServices.getAllPembelajaran();
      setPembelajaran(data.data);
    };
    useEffect(() => {
      getAllPembelajaran();
    }, []);
  return <AdminPembelajaranView pembelajaran={pembelajaran}  />
};

export default AdminPembelajaranPage;
