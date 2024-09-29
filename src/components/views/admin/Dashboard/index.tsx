import AdminLayout from "@/components/layouts/AdminLayout";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";

const DashboardAdminView = () => {
  const [profile, setProfile] = useState<User | any>({});
  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <AdminLayout>
      <div>
        <div>
          <h1>
            Selamat Datang dihalaman {profile.role}, {profile.fullname}
          </h1>
          <h3>Silahkan Gunakan Fitur Yang Tersedia yang berada di Sidebar</h3>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdminView;
