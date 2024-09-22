import AdminOrdersView from "@/components/views/Guru/Orders";
import orderServices from "@/services/order";
import { useEffect, useState } from "react";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const getAllOrders = async () => {
      const { data } = await orderServices.getAllOrders();
      setOrders(data.data);
    };
    useEffect(() => {
      getAllOrders();
    }, []);
  return <AdminOrdersView orders={orders}  />
};

export default AdminOrdersPage;
