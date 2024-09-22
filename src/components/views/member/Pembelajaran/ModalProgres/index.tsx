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

type Proptypes = {
    progres: Pembelajaran | any;
    setProgres: Dispatch<SetStateAction<boolean>>;
    setPembelajaranData: Dispatch<SetStateAction<Order[]>>;
};

const ModalProgres = (props: Proptypes) => {
    const { progres, setProgres, setPembelajaranData } = props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Modal onClose={() => setProgres(false)}>
            <h5 className={styles.modal_title}>Cek Progres</h5>
            <div className={styles.progres}>
                {progres.progres.map((progres: any) => (
                    <div>
                        <Button className={styles.progres_title} type="button">{progres.title}</Button>
                        <div className={styles.progres_description}>{progres.description}</div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};
export default ModalProgres;
