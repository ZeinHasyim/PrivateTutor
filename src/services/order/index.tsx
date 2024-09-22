import instance from "@/lib/axios/instance";

const endpoint = "/api/order";

const orderServices = {
  getAllOrders: () => instance.get(endpoint),
  getDetailOrder: (id: string) => instance.get(`${endpoint}/${id}`),
  addOrder: (data: any) => instance.post(endpoint, data),
  updateOrder: (id: string, data: any) =>
    instance.put(`${endpoint}/${id}`, { data }),
  deleteOrder: (id: string) => instance.delete(`${endpoint}/${id}`),
};

export default orderServices;
