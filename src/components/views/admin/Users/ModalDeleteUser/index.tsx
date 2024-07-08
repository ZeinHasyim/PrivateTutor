import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { User } from "@/types/user.type";
import { ToasterContext } from "@/contexts/ToasterContext";

type Proptypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(deletedUser.id);
    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Success Delete User",
      });
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete User",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div>
        <h1 className={styles.modal__title}>Are You Sure?</h1>
        <Button type="button" onClick={() => handleDelete()}>
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
