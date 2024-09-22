import Button from "@/components/ui/Button";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import GuruLayout from "@/components/layouts/GuruLayout";
import ModalDeleteOrder from "./ModalDeleteOrder";
import ModalUpdateOrder from "./ModalUpdateStatus";
import { Pembelajaran } from "@/types/pembelajaran.type";
import ModalUpdateStatus from "./ModalUpdateStatus";
import ModalProgres from "./ModalProgres";
import ModalAproval from "./ModalAproval";
import ModalHari from "./ModalHari";

type PropTypes = {
    pembelajaran: Pembelajaran[];
};

const GuruPembelajaranView = (props: PropTypes) => {
    const { pembelajaran } = props;
    const [pembelajaranData, setPembelajaranData] = useState<Pembelajaran[]>([]);
    const [updatedStatus, setUpdatedStatus] = useState<Pembelajaran | {}>({});
    const [progres, setProgres] = useState<Pembelajaran['progres'] | {}>({});
    const [hari, setHari] = useState<Pembelajaran | {}>({});

    useEffect(() => {
        setPembelajaranData(pembelajaran);
    }, [pembelajaran]); 
    return (
        <>
            <GuruLayout>
                <div className={styles.orders}>
                    <h1>Pembelajaran Saya</h1>
                    <table className={styles.orders__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Member</th>
                                <th>Nomor Telepon</th>
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
                                    <td>{pembelajaran.member_name}</td>
                                    <td>{pembelajaran.member_phone}</td>
                                    <td>{pembelajaran.meeting}</td>
                                    <td>
                                        {
                                        pembelajaran.day?.map((day: any) => (
                                            <Button key={day} type="button" className={styles.badge}>{day}</Button>
                                        ))


                                        }
                                        </td>
                                    <td>{pembelajaran.status}</td>
                                    <td>
                                        <div className={styles.action_wrapper}>
                                            {(pembelajaran.status != 'aprove') && (pembelajaran.status != 'decline') && (pembelajaran.status != 'on progress') && (pembelajaran.status != 'selesai') && (!pembelajaran.days) ?
                                                ""
                                                :
                                                <>
                                                    {(pembelajaran.status != 'pending') ?
                                                        <Button
                                                            className={styles.btn}
                                                            type="button"
                                                            onClick={() => setProgres(pembelajaran)}
                                                        >
                                                            Laporkan Progres
                                                        </Button>
                                                        :
                                                        '-'}
                                                    {pembelajaran.status != 'selesai' ? <Button
                                                        className={styles.btn}
                                                        type="button"
                                                        onClick={() => setUpdatedStatus(pembelajaran)}
                                                    >
                                                        Update status
                                                    </Button> : ''}
                                                </>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GuruLayout >
            {/* {Object.keys(detailOrder).length > 0 && (
                <ModalDetailOrder
                    setDetailOrder={setDetailOrder}
                    detailOrder={detailOrder}
                    products={products}
                />
            )} */}
            {
                Object.keys(updatedStatus).length > 0 && (
                    <ModalUpdateStatus
                        setUpdatedStatus={setUpdatedStatus}
                        updatedStatus={updatedStatus}
                        setPembelajaranData={setPembelajaranData}
                    />
                )
            }
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
                Object.keys(hari).length > 0 && (
                    <ModalHari
                        setHari={setHari}
                        hari={hari}
                        setPembelajaranData={setPembelajaranData}
                    />
                )
            }
        </>
    );
};

export default GuruPembelajaranView;
