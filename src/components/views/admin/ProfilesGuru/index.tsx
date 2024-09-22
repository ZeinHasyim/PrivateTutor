import styles from "./Products.module.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import { Profile } from "@/types/profile.type";
import AdminLayout from "@/components/layouts/AdminLayout";
import convertIDR from "@/utils/currency";
import Button from "@/components/ui/Button";
import ModalDetailProfile from "./ModalDetailProfile";
import { User } from "@/types/user.type";
import Image from "next/image";

type PropTypes = {
  profilesGuru: User[];
};
const ProfilesGuruAdminView = (props: PropTypes) => {
  const { profilesGuru } = props;
  const [profilesGuruData, setProfilesGuruData] = useState<User[]>([]);
  //   const [modalAddProduct, setModalAddProduct] = useState(false);
  const [detailProfile, setDetailProfile] = useState<User | {}>({});
  //   const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});

  useEffect(() => {
    const filteredData = profilesGuru.filter(
      (item) => item.profile_status && item.profile_status.trim() !== ""
    );
    setProfilesGuruData(filteredData);
  }, [profilesGuru]);
  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h1>Profile Guru Management</h1>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Guru</th>
                <th>Category | SubCategory</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profilesGuruData.map((profile, index) => (
                <Fragment key={profile.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={profile.image}
                        alt="Profile Guru"
                        width={200}
                        height={200}
                        className={styles.products__table__image}
                      />
                    </td>
                    <td>{profile.fullname}</td>
                    <td>{profile.profile.category} | {profile.profile.subcategory}</td>
                    <td>{convertIDR(profile.profile.price)}</td>
                    <td>{profile.profile_status}</td>
                    <td>
                      <div className={styles.products__table__action}>
                        <Button
                          type="button"
                          className={styles.products__table__action__edit}
                          onClick={() => setDetailProfile(profile)}
                        >
                          <i className="bx bx-edit"></i>
                        </Button>
                        {/* <Button
                          type="button"
                          className={styles.products__table__action__delete}
                          onClick={() => setDeletedProduct(product)}
                        >
                          <i className="bx bx-trash"></i>
                        </Button> */}
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(detailProfile).length > 0 && (
        <ModalDetailProfile
          setDetailProfile={setDetailProfile}
          detailProfile={detailProfile}
          setProfilesGuruData={setProfilesGuruData}
        />
      )}
      {/* {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          setProductsData={setProductsData}
        />
      )} */}
    </>
  );
};

export default ProfilesGuruAdminView;
