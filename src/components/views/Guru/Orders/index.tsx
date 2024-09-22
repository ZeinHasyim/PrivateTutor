import Button from "@/components/ui/Button";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import userServices from "@/services/user";
import ModalDetailOrder from "./ModalDetailOrder"
import AdminLayout from "@/components/layouts/AdminLayout";
import orderServices from "@/services/order";
import { Order } from "@/types/order.type";
import ModalDeleteOrder from "./ModalDeleteOrder";
import ModalUpdateOrder from "./ModalUpdateOrder";

type PropTypes = {
    orders: Order[];
};

const AdminOrdersView = (props: PropTypes) => {
    const { orders } = props;
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [updatedOrder, setUpdatedOrder] = useState<Order | {}>({});
    const [deletedOrder, setDeletedOrder] = useState<Order | {}>({});

    useEffect(() => {
        setOrdersData(orders);
    }, [orders]);


    return (
        <>
            <AdminLayout>
                <div className={styles.orders}>
                    <h1>Order History</h1>
                    <table className={styles.orders__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Course | Student</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData.map((order: any, index: number) => (
                                <tr key={order.orderIdx}>
                                    <td>{index + 1}</td>
                                    <td>{order.orderIdx}</td>
                                    <td><b>{order.product_name}</b> | {order.student_name}</td>
                                    <td>{order.startTime == '' && order.endTime == '' ? 'Not Set' : order.startTime + ' - ' + order.endTime}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <div className={styles.orders__table__action}>
                                            <Button
                                                type="button"
                                                className={styles.orders__table__action__edit}
                                                onClick={() => setUpdatedOrder(order)}
                                            >
                                                <i className="bx bx-pencil"></i>
                                            </Button>
                                            <Button
                                                type="button"
                                                className={styles.orders__table__action__delete}
                                                onClick={() => setDeletedOrder(order)}
                                            >
                                                <i className="bx bx-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
            {/* {Object.keys(detailOrder).length > 0 && (
                <ModalDetailOrder
                    setDetailOrder={setDetailOrder}
                    detailOrder={detailOrder}
                    products={products}
                />
            )} */}
            {Object.keys(updatedOrder).length > 0 && (
                <ModalUpdateOrder
                    setUpdatedOrder={setUpdatedOrder}
                    updatedOrder={updatedOrder}
                    setOrdersData={setOrdersData}
                />
            )}
            {Object.keys(deletedOrder).length > 0 && (
                <ModalDeleteOrder
                    setDeletedOrder={setDeletedOrder}
                    deletedOrder={deletedOrder}
                    setOrdersData={setOrdersData}
                />
            )}
        </>
    );
};

export default AdminOrdersView;
