import Button from "@/components/ui/Button";
import styles from "./Users.module.scss";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { User } from "@/types/user.type";
import AdminLayout from "@/components/layouts/AdminLayout";

type PropTypes = {
  users: User[];
};
const UsersAdminView = (props: PropTypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<User | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>({});
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>User Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: User, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button
                        type="button"
                        onClick={() => setUpdatedUser(user)}
                        className={styles.users__table__action__edit}
                      >
                        <i className="bx bx-edit"></i>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setDeletedUser(user)}
                        className={styles.users__table__action__delete}
                      >
                        <i className="bx bx-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length > 0 ? (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      ) : null}

      {Object.keys(deletedUser).length > 0 ? (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      ) : null}
    </>
  );
};

export default UsersAdminView;
