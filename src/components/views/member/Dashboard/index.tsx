import MemberLayout from "@/components/layouts/MemberLayout";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";

const DashboardMemberView = () => {
  const [profile, setProfile] = useState<User | any>({});
  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <MemberLayout>
      <div>
        <div>
          <h1>
            Selamat Datang di Private Tutor  {profile.fullname}
          </h1>
          <h3>Silahkan Gunakan Fitur Yang Tersedia yang berada di Sidebar</h3>
        </div>
      </div>
    </MemberLayout>
  );
};

export default DashboardMemberView;
