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
    updatedStatus: Pembelajaran | any;
    setUpdatedStatus: Dispatch<SetStateAction<boolean>>;
    setPembelajaranData: Dispatch<SetStateAction<Pembelajaran[]>>;
};

const ModalUpdateStatus = (props: Proptypes) => {
    const { updatedStatus, setUpdatedStatus, setPembelajaranData } = props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);

    const updatePembelajran = async (
        form: any,
    ) => {
        const data = {
            status: 'selesai'
        };
        const result = await pembelajaranServices.updatePembelajaran(updatedStatus.id, data);
        if (result.status === 200) {
            setIsLoading(false);
            form.reset();
            setUpdatedStatus(false);
            const { data } = await pembelajaranServices.getAllPembelajaran();
            const filteredPembelajaran = data.data.filter(
                (data : any) =>
                    data.status_pay !== "not pay"
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const form: any = event.target as HTMLFormElement;
        updatePembelajran(form);
    };
    return (
        <Modal onClose={() => setUpdatedStatus(false)}>
            <h1>Set Status</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Button className={styles.btn_selesai} type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Selesai"}
                </Button>
            </form>
        </Modal>
    );
};
export default ModalUpdateStatus;
