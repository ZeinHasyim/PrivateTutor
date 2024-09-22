import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteOrder.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import orderServices from "@/services/order";
import { Order } from "@/types/order.type";

type Proptypes = {
  setOrdersData: Dispatch<SetStateAction<Order[]>>;
  setDeletedOrder: Dispatch<SetStateAction<{}>>;
  deletedOrder: Order | any;
};

const ModalDeleteOrder = (props: Proptypes) => {
  const { deletedOrder, setDeletedOrder, setOrdersData} =
    props;
    const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await orderServices.deleteOrder(deletedOrder.id);
    if (result.status === 200) {
      setIsLoading(false);
      setDeletedOrder({});
      const { data } = await orderServices.getAllOrders();
      setOrdersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Product",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedOrder({})}>
      <div>
        <h1 className={styles.modal__title}>Are You Sure?</h1>
        <Button type="button" onClick={() => handleDelete()}>
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteOrder;
