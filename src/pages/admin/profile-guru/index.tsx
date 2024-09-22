import ProfilesGuruAdminView from "@/components/views/Admin/ProfilesGuru";
import profilesServices from "@/services/profiles";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminProfilesGuruPage = () => {
  const [profilesGuru, setProfilesGuru] = useState([]);
  const getAllProfiles = async () => {
    const { data } = await userServices.getAllProfileUsers();
    setProfilesGuru(data.data);
  };
  useEffect(() => {
    getAllProfiles();
  }, []);
  return <ProfilesGuruAdminView profilesGuru={profilesGuru}  />;
};

export default AdminProfilesGuruPage;
