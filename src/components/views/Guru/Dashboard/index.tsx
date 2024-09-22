import GuruLayout from "@/components/layouts/GuruLayout";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";

const DashboardGuruView = () => {
  const [profile, setProfile] = useState<User | any>({});
  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <GuruLayout>
      <div>
        <div>
          <h1>
            Selamat Datang dihalaman {profile.role}, {profile.fullname}
          </h1>
          <h3>Silahkan Gunakan Fitur Yang Tersedia yang berada di Sidebar</h3>
        </div>
      </div>
    </GuruLayout>
  );
};

export default DashboardGuruView;
