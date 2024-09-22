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

type Proptypes = {
    updatedOrder: Order | any;
    setUpdatedOrder: Dispatch<SetStateAction<boolean>>;
    setOrdersData: Dispatch<SetStateAction<Order[]>>;
};

const ModalUpdateOrder = (props: Proptypes) => {
    const { updatedOrder, setUpdatedOrder, setOrdersData } = props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);

    const updateOrder = async (
        form: any,
    ) => {
        const data = {
            status: form.status.value,
        };
        const result = await orderServices.updateOrder(updatedOrder.id, data);
        if (result.status === 200) {
            setIsLoading(false);
            form.reset();
            setUpdatedOrder(false);
            const { data } = await orderServices.getAllOrders();
            setOrdersData(data.data);
            setToaster({
                variant: "success",
                message: "Success Update Order",
            });
        } else {
            setIsLoading(false);
            setToaster({
                variant: "danger",
                message: "Failed Update Order",
            });
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const form: any = event.target as HTMLFormElement;
        updateOrder(form);
    };
    return (
        <Modal onClose={() => setUpdatedOrder(false)}>
            <h1>Set Status</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Select
                    label="status"
                    name="status"
                    options={[
                        { label: "Pending", value: "pending" },
                        { label: "Success", value: "success" },
                    ]}
                    defaultValue={updatedOrder.status}
                    className={styles.form__input}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Update Status"}
                </Button>
            </form>
        </Modal>
    );
};
export default ModalUpdateOrder;
