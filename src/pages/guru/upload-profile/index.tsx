import UploadProfileGuru from "@/components/views/Guru/UploadProfile";
import profilesServices from "@/services/profiles";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const GuruUploadProfile = () => {
  const [profile, setProfile] = useState([]);
  const getAllProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);

  };
  useEffect(() => {
    getAllProfile();
  }, []);
  return <UploadProfileGuru profile={profile}  />;
};

export default GuruUploadProfile;
