import Button from "@/components/ui/Button";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import MemberLayout from "@/components/layouts/MemberLayout";
import ModalDeleteOrder from "./ModalDeleteOrder";
import ModalUpdateOrder from "./ModalProgres";
import { Pembelajaran } from "@/types/pembelajaran.type";
import ModalProgres from "./ModalProgres";
import { useSession } from "next-auth/react";
import PaymentServices from "@/services/payment";
import { useRouter } from "next/router";
import pembelajaranServices from "@/services/pembelajaran";
import Script from "next/script";

declare global {
    interface Window {
        snap: any
    }
}

type PropTypes = {
    pembelajaran: Pembelajaran[];
};

const MemberPembelajaranView = (props: PropTypes) => {
    const { pembelajaran } = props;
    const { status, data }: any = useSession();
    const user = data?.user;
    const [pembelajaranData, setPembelajaranData] = useState<Pembelajaran[]>([]);
    const [progres, setProgres] = useState<Pembelajaran | {}>({});
    // const [deletedOrder, setDeletedOrder] = useState<Order | {}>({});
    const router = useRouter();

    useEffect(() => {
        setPembelajaranData(pembelajaran);
    }, [pembelajaran]);

    const payNow = async (pembelajaran: any) => {
        const orderIdx = 'PT-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const payload = {
            user: {
                fullname: pembelajaran?.member_name,
                email: user?.email,
                phone: user?.phone,
                address: "",
            },
            transaction: {
                order_id: orderIdx,
                total: pembelajaran.price
            }
        }
        const {data} = await PaymentServices.createPayment(payload);

        const payment_token = data.data.transaction.token;
        window.snap.pay(payment_token, {
            onSuccess: async function () {
                const myPembelajaran = {
                    orderIdx: orderIdx,
                    status_pay: 'pay',
                };
                const result = await pembelajaranServices.updatePembelajaran(pembelajaran.id,myPembelajaran);

                if (result) {
                    router.push('/payment/success');
                    window.open(`/invoice/${orderIdx}`, '_blank');
                }

            },
            onError: function () {
            },
            onClose: async function () {
                const myPembelajaran = {
                    orderIdx: orderIdx,
                    status_pay: 'not pay',
                };
                const result = await pembelajaranServices.updatePembelajaran(pembelajaran.id,myPembelajaran);
                const { data } = await pembelajaranServices.getAllPembelajaran();
                setPembelajaranData(data.data);
            }
        });

    }

    return (
        <>
        <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />

            <MemberLayout>
                <div className={styles.orders}>
                    <h1>Pembelajaran Saya</h1>
                    <table className={styles.orders__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Class | Teacher</th>
                                <th>Jumlah Pertemuan</th>
                                <th>Nomor Telepon</th>
                                <th>Hari</th>
                                <th>Status Pembayaran</th>
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
                                    <td>{pembelajaran.meeting}</td>
                                    <td>{pembelajaran.teacher_number}</td>
                                    <td>{pembelajaran.day?.map((day: string) => (
                                        <Button key={day} type="button" className={styles.badge}>{day}</Button>
                                    ))}</td>
                                    <td>{pembelajaran.status_pay} {pembelajaran.status_pay == 'not pay' ? <button onClick={() => payNow(pembelajaran)} type="button" className={styles.pay_now}>Pay now</button> : ''}</td>
                                    <td>{pembelajaran.status}</td>
                                    <td>
                                        <div>
                                            <Button
                                                type="button"
                                                onClick={() => setProgres(pembelajaran)}
                                            >
                                                Cek Progres
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MemberLayout >
            {/* {Object.keys(detailOrder).length > 0 && (
                <ModalDetailOrder
                    setDetailOrder={setDetailOrder}
                    detailOrder={detailOrder}
                    products={products}
                />
            )} */}
            {
                Object.keys(progres).length > 0 && (
                    <ModalProgres
                        setProgres={setProgres}
                        progres={progres}
                        setPembelajaranData={setPembelajaranData}
                    />
                )
            }
            {/* {
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

export default MemberPembelajaranView;
