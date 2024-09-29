import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalUpdateOrder.module.scss";
import {
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { ToasterContext } from "@/contexts/ToasterContext";

import { Pembelajaran } from "@/types/pembelajaran.type";

type Proptypes = {
    progres: Pembelajaran | any;
    setProgres: Dispatch<SetStateAction<boolean>>;
    setPembelajaranData: Dispatch<SetStateAction<any>>;
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
                    <div key={progres.id}>
                        <Button className={styles.progres_title} type="button">{progres.title}</Button>
                        <div className={styles.progres_description}>{progres.description}</div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};
export default ModalProgres;
