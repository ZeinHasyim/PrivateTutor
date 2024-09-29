import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import styles from "./ModalUpdateOrder.module.scss";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useContext,
    useState,
} from "react";
import InputFile from "@/components/ui/InputFile";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import { ToasterContext } from "@/contexts/ToasterContext";
import productServices from "@/services/product";
import orderServices from "@/services/order";
import { Pembelajaran } from "@/types/pembelajaran.type";
import pembelajaranServices from "@/services/pembelajaran";

type Proptypes = {
    hari: Pembelajaran | any;
    setHari: Dispatch<SetStateAction<boolean>>;
    setPembelajaranData: Dispatch<SetStateAction<Pembelajaran[]>>;
};

const ModalHari = (props: Proptypes) => {
    const { hari, setHari, setPembelajaranData } = props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);

    const items = Array.from({ length: 5 }, (_, index) => `Pertemuan ${index + 1}`);

    const updateHari = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form: any = event.target as HTMLFormElement;
        const formData = new FormData(form);

        // Mengumpulkan data dalam format array
        const days = items.map((_, index) => ({
            hari: formData.get(`hari[${index}]`) as string || '',
            jam: formData.get(`jam[${index}]`) as string || ''
        }));

        const data = {
            days: days
        };
        const result = await pembelajaranServices.updatePembelajaran(hari.id, data);
        if (result.status === 200) {
            setIsLoading(false);
            setHari(false);
            const { data } = await pembelajaranServices.getAllPembelajaran();
            const filteredPembelajaran = data.data.filter(
                (data : any) =>
                    data.status_pay === "not pay"
            );
              setPembelajaranData(filteredPembelajaran);
            setToaster({
                variant: "success",
                message: "Success Update Status",
            });
        } else {
            setIsLoading(false);
            setToaster({
                variant: "danger",
                message: "Failed Update Status",
            });
        }
    };


    return (
        <Modal onClose={() => setHari(false)}>
            <h1>Set Hari</h1>
            <form onSubmit={updateHari} className={styles.form}>
            {items.map((item, index) => (
                <div key={item} style={{ textAlign: "center" }}>
                    {item}
                    <div className={styles.hari_wrapper}>
                        <Input label="Hari" type="text" name={`hari[${index}]`} />
                        <Input label="Jam" type="time" name={`jam[${index}]`} />
                    </div>
                </div>
            ))}
            <Button type="submit">Save</Button>
            </form>
        </Modal>
    );
};
export default ModalHari;
