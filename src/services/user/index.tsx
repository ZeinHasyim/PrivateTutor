import instance from "@/lib/axios/instance";

const endpoint = {
  user: "/api/user",
  profile: "/api/user/profile",
};

const userServices = {
  getAllUsers: () => instance.get(endpoint.user),
  getAllProfileUsers: () => instance.get(`${endpoint.user}/profiles`),
  getUserAproved: () => instance.get(`${endpoint.user}/profile-aproved`),
  getUserById: (id: string) => instance.get(`${endpoint.user}/${id}`),
  updateUser: (id: string, data: any) =>
    instance.put(`${endpoint.user}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endpoint.user}/${id}`),
  getProfile: () => instance.get(endpoint.profile),
  updateProfile: (data: any) => instance.put(endpoint.profile, { data }),
};

export default userServices;
