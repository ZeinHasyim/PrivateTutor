import instance from "@/lib/axios/instance";

const endpoint = "/api/pembelajaran";

const pembelajaranServices = {
  getAllPembelajaran: () => instance.get(endpoint),
  getDetailPembelajaran: (id: string) => instance.get(`${endpoint}/${id}`),
  addPembelajaran: (data: any) => instance.post(endpoint, data),
  updatePembelajaran: (id: string, data: any) =>
    instance.put(`${endpoint}/${id}`, { data }),
//   deleteOrder: (id: string) => instance.delete(`${endpoint}/${id}`),
};

export default pembelajaranServices;
