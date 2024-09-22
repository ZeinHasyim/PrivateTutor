import instance from "@/lib/axios/instance";

const endpoint = "/api/profile";

const profilesServices = {
  getAllProfiles: () => instance.get(endpoint),
  getAllAprovedProfiles: () => instance.get(`${endpoint}/aproved/`),
  getAllProfilesByUser: (id: string) => instance.get(`${endpoint}/user/${id}`),
  getDetailProfile: (id: string) => instance.get(`${endpoint}/${id}`),
  getDetailProfileByUser: (id: string) => instance.get(`${endpoint}/detail-by-id/${id}`),
  addProfile: (data: any) => instance.post(endpoint, data),
  updateProfile: (id: string, data: any) =>
    instance.put(`${endpoint}/${id}`, { data }),
  updateProfileStatus: (id: string, data: any) =>
    instance.put(`${endpoint}/${id}`, { data }),
  deleteProfile: (id: string) => instance.delete(`${endpoint}/${id}`),
};

export default profilesServices;
