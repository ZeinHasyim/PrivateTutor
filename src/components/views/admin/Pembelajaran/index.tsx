import Button from "@/components/ui/Button";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Pembelajaran } from "@/types/pembelajaran.type";
import ModalProgres from "./ModalProgres";
import ModalAproval from "../../Guru/Pembelajaran/ModalAproval";

type PropTypes = {
    pembelajaran: Pembelajaran[];
};

const AdminPembelajaranView = (props: PropTypes) => {
    const { pembelajaran } = props;
    const [pembelajaranData, setPembelajaranData] = useState<Pembelajaran[]>([]);
    const [progres, setProgres] = useState<Pembelajaran | {}>({});
    const [aproval, setAproval] = useState<Pembelajaran | {}>({});
    // const [updatedOrder, setUpdatedOrder] = useState<Order | {}>({});
    // const [deletedOrder, setDeletedOrder] = useState<Order | {}>({});

    useEffect(() => {
        setPembelajaranData(pembelajaran);
    }, [pembelajaran]);


    return (
        <>
            <AdminLayout>
                <div className={styles.orders}>
                    <h1>Pembelajaran</h1>
                    <table className={styles.orders__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Class | Teacher</th>
                                <th>Siswa</th>
                                <th>Jumlah Pertemuan</th>
                                <th>Hari</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pembelajaranData.map((pembelajaran: any, index: number) => (
                                <tr key={pembelajaran.orderIdx}>
                                    <td>{index + 1}</td>
                                    <td><a style={{ color: 'blue' }} href={`/invoice/${pembelajaran.orderIdx}`} target="_blank" rel="noopener noreferrer">
                                        {pembelajaran.orderIdx}
                                    </a></td>
                                    <td><b>{pembelajaran.category}</b> | {pembelajaran.teacher_name}</td>
                                    <td>{pembelajaran.member_name}</td>

                                    <td>{pembelajaran.meeting}</td>
                                    <td>{pembelajaran.day?.map((day:string)=> (
                                        <Button key={day} type="button" className={styles.badge}>{day}</Button>
                                    ))}</td>
                                    <td>{pembelajaran.status}</td>
                                    <td>
                                        <div>
                                        {(pembelajaran.status != 'aprove') && (pembelajaran.status != 'decline') && (pembelajaran.status != 'on progress') && (pembelajaran.status != 'selesai') ?
                                                <Button
                                                    className={styles.btn}
                                                    type="button"
                                                    onClick={() => setAproval(pembelajaran)}
                                                >
                                                    Aproval
                                                </Button>
                                                :
                                                <>
                                                    {(pembelajaran.status != 'selesai') ?
                                                        <Button
                                                            type="button"
                                                            onClick={() => setProgres(pembelajaran)}
                                                        >
                                                            Cek Progres
                                                        </Button>
                                                        :
                                                        '-'}
                                                </>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminLayout >
            {
                Object.keys(progres).length > 0 && (
                    <ModalProgres
                        setProgres={setProgres}
                        progres={progres}
                        setPembelajaranData={setPembelajaranData}
                    />
                )
            }
               {
                Object.keys(aproval).length > 0 && (
                    <ModalAproval
                        setAproval={setAproval}
                        aproval={aproval}
                        setPembelajaranData={setPembelajaranData}
                    />
                )
            }
            {/* {Object.keys(detailOrder).length > 0 && (
                <ModalDetailOrder
                    setDetailOrder={setDetailOrder}
                    detailOrder={detailOrder}
                    products={products}
                />
            )} */}
            {/* {
                Object.keys(updatedOrder).length > 0 && (
                    <ModalUpdateOrder
                        setUpdatedOrder={setUpdatedOrder}
                        updatedOrder={updatedOrder}
                        setOrdersData={setOrdersData}
                    />
                )
            }
            {
                Object.keys(deletedOrder).length > 0 && (
                    <ModalDeleteOrder
                        setDeletedOrder={setDeletedOrder}
                        deletedOrder={deletedOrder}
                        setOrdersData={setOrdersData}
                    />
                )
            } */}
        </>
    );
};

export default AdminPembelajaranView;
