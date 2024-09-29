import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import convertIDR from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import Link from "next/link";
import Script from "next/script";
import PaymentServices from "@/services/payment";
import orderServices from "@/services/order";
import { Profile } from "@/types/profile.type";
import { User } from "@/types/user.type";
import pembelajaranServices from "@/services/pembelajaran";
import Input from "@/components/ui/Input";

declare global {
    interface Window {
        snap: any
    }
}

type PropTypes = {
    guru: User | any;
    guruId: string | string[] | undefined;
};

const DetailProductView = (props: PropTypes) => {
    const { guru, guruId } = props;
    const [totalHarga, setTotalHarga] = useState<number>();
    const { setToaster } = useContext(ToasterContext);
    const { status, data }: any = useSession();
    const user = data?.user;
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Handler untuk mengelola perubahan checkbox
    const handleCheckboxChange = (event : any) => {
        const { value, checked } = event.target;
        setSelectedDays(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(day => day !== value);
            }
        });
    };



    const router = useRouter();

    useEffect(() => {
        setTotalHarga(guru?.profile?.price * 3)
    }, [guru])


    const handleTotalHarga = (event: any) => {
        setTotalHarga(guru?.profile?.price * event.target.value)
    }



    const handlePayment = async (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        const orderIdx = 'PT-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const payload = {
            user: {
                fullname: user?.fullname,
                email: user?.email,
                phone: user?.phone,
                address: "",
            },
            transaction: {
                order_id: orderIdx,
                total: totalHarga
            }
        }
        const { data } = await PaymentServices.createPayment(payload);

        const payment_token = data.data.transaction.token;
        window.snap.pay(payment_token, {
            onSuccess: async function () {
                const myPembelajaran = {
                    orderIdx: orderIdx,
                    member_id: user.id,
                    member_name: user.fullname,
                    member_phone: user.phone,
                    teacher_id: guruId,
                    teacher_name: guru.fullname,
                    teacher_number: guru.phone,
                    category: guru?.profile?.category,
                    meeting: form.meeting.value,
                    price: totalHarga,
                    day: selectedDays,
                    status_pay: 'pay',
                    status: 'pending',
                    progres: []
                };
                const result = await pembelajaranServices.addPembelajaran(myPembelajaran);
                console.log(result);

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
                    member_id: user.id,
                    member_name: user.fullname,
                    teacher_id: guruId,
                    teacher_name: guru.fullname,
                    teacher_number: guru.phone,
                    category: guru?.profile?.category,
                    subcategory: guru?.profile?.subcategory,
                    meeting: form.meeting.value,
                    price: totalHarga,
                    day: selectedDays,
                    status_pay: 'not pay',
                    status: 'pending',
                    progres: []
                };
                const result = await pembelajaranServices.addPembelajaran(myPembelajaran);
                if (result) {
                    router.push('/member/pembelajaran');
                }
            }
        });
    }

    return (
        <>
            <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
            <div className={styles.detail}>
                <div className={styles.detail__main}>
                    <div className={styles.detail__main__left}>
                        <Image
                            src={guru.image}
                            alt={guru?.fullname}
                            width={500}
                            height={500}
                            className={styles.detail__main__left__image}
                        />
                    </div>
                    <div className={styles.detail__main__right}>
                        <h1>{guru?.fullname}</h1>
                        <h3 className={styles.detail__main__right__category}>
                            {guru?.profile?.category} | {guru?.profile?.subcategory}
                        </h3>
                        <h3 className={styles.detail__main__right__price}>
                            {convertIDR(guru?.profile?.price)} / Pertemuan
                        </h3>
                        <p className={styles.detail__main__right__description}>
                            {guru?.profile?.description}
                        </p>
                        <br />
                        <h4>Pengalaman :</h4>
                        <ul>
                            {guru?.profile?.pengalaman.map((pengalaman: any)=>(
                                <li key={pengalaman.id}>{pengalaman.name} ({pengalaman.year} tahun)</li>
                            ))}
                        </ul>

                        <form onSubmit={handlePayment}>
                            <Input
                                label="Berapa Kali Pertemuan ? (Minimal 3x Pertemuan)"
                                name="meeting"
                                type="number"
                                min={3}
                                defaultValue={3}
                                onChange={handleTotalHarga}
                            />
                            <div style={{ marginBottom: "20px" }}>
                                <h3>Pilih Hari</h3>
                                {guru.profile?.day.map((day : any, index :number)=> (
                                    <div key={index}>
                                        <input type="checkbox" id={index} value={`${day.hari} | ${day.jam}`} onChange={handleCheckboxChange} name="day"/>
                                        <label htmlFor={index}>{day.hari} | {day.jam}</label>
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="jumlah_harga">Jumlah Harga yang harus dibayar</label>
                            <h5 className={styles.total_harga}>{convertIDR(totalHarga ? totalHarga : guru?.profile?.price)}</h5>
                            <Button
                                disabled={user?.role === 'editor' || user?.role === 'admin'}
                                className={styles.detail__main__right__add}
                                type={status === "authenticated" ? "submit" : "button"}
                                onClick={() => {
                                    if (status === "unauthenticated") {
                                        router.push(`/auth/login?callbackUrl=${router.asPath}`);
                                    }
                                }}
                            >
                                Payment Now
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailProductView;
