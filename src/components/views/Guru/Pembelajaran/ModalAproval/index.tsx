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
import { Order } from "@/types/order.type";
import orderServices from "@/services/order";
import { Pembelajaran } from "@/types/pembelajaran.type";
import pembelajaranServices from "@/services/pembelajaran";

type Proptypes = {
    aproval: Pembelajaran | any;
    setAproval: Dispatch<SetStateAction<boolean>>;
    setPembelajaranData: Dispatch<SetStateAction<Pembelajaran[]>>;
};

const ModalAproval = (props: Proptypes) => {
    const { aproval, setAproval, setPembelajaranData } = props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);

    const updatePembelajran = async (
        event: any,
    ) => {
        const data = {
            status: event.target.value
        }

        const result = await pembelajaranServices.updatePembelajaran(aproval.id, data);
        if (result.status === 200) {
            setIsLoading(false);
            setAproval(false);
            const { data } = await pembelajaranServices.getAllPembelajaran();
            setPembelajaranData(data.data);
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
        <Modal onClose={() => setAproval(false)}>
            <h1>Set Status</h1>
            <form className={styles.form}>
            <div className={styles.form__button_flex}>
                    <input className={styles.form__button_flex__btn_aprove} type="button" onClick={updatePembelajran} name="status" value={isLoading ? "Loading..." : "aprove"} disabled={isLoading} />
                    <input className={styles.form__button_flex__btn_decline} type="button" onClick={updatePembelajran} name="status" value={isLoading ? "Loading..." : "decline"} disabled={isLoading} />
                </div>
            </form>
        </Modal>
    );
};
export default ModalAproval;
