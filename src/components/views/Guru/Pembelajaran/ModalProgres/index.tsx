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
import { ToasterContext } from "@/contexts/ToasterContext";
import { Pembelajaran } from "@/types/pembelajaran.type";
import Textarea from "@/components/ui/Textarea";
import { title } from "process";
import pembelajaranServices from "@/services/pembelajaran";

type Proptypes = {
    progres: Pembelajaran | any;
    setProgres: Dispatch<SetStateAction<boolean>>;
    setPembelajaranData: Dispatch<SetStateAction<Pembelajaran[]>>;
};

const ModalProgres = (props: Proptypes) => {
    const { progres, setProgres, setPembelajaranData } = props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);

    const updateProgres = async (form: any) => {
        const id = `${Date.now()}-${Math.random().toString(16)}`;
        const oldProgres = progres.progres;
        const newProgres = {
            id: id,
            title: form.title.value,
            description: form.description.value,
        };
        const data = {
            status: 'on progress',
            progres: oldProgres.some((progres: any) => progres.id === newProgres.id)
                ? oldProgres.map((progres: any) =>
                    progres.id === newProgres.id
                        ? { ...progres, ...newProgres }
                        : progres
                  )
                : [...oldProgres, newProgres]
        };
        const result = await pembelajaranServices.updatePembelajaran(progres.id, data);

        if (result.status === 200) {
            setIsLoading(false);
            form.reset();
            setProgres(false);
            const { data } = await pembelajaranServices.getAllPembelajaran();
            const filteredPembelajaran = data.data.filter(
                (data : any) =>
                    data.status_pay !== "not pay"
            );
              setPembelajaranData(filteredPembelajaran);
            setToaster({
                variant: "success",
                message: "Success Laporkan Progress",
            });
        } else {
            setIsLoading(false);
            setToaster({
                variant: "danger",
                message: "Failed Laporkan Progress",
            });
        }


    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const form: any = event.target as HTMLFormElement;
        updateProgres(form);
    };

    return (
        <Modal onClose={() => setProgres(false)}>
            <h5 className={styles.modal_title}>Progres</h5>
            <div className={styles.progres}>
                 <form onSubmit={handleSubmit} className={styles.form}>
                    <Input label="Title" name="title" type="text"/>
                    <Textarea label="Description" name="description"></Textarea>
                    <Button type="submit">Add new progress</Button>
                 </form>
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
