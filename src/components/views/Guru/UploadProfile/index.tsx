import GuruLayout from "@/components/layouts/GuruLayout";
import Button from "@/components/ui/Button";
import styles from "./Certificates.module.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import ModalAddProfile from "./ModalAddProfile";
import convertIDR from "@/utils/currency";
import Image from "next/image";
import ModalDeleteProfile from "./ModalDeleteProfile";
import { User } from "@/types/user.type";
import ModalUpdatedProfile from "./ModalUpdateProfile";

type PropTypes = {
    profile: User | any;
};
const UploadProfilesGuruView = (props: PropTypes) => {
    const { profile } = props;
    const [profilesData, setProfilesData] = useState<User | any>({});
    const [modalAddProfile, setModalAddProfile] = useState<User | {}>(false);
    const [updatedProfile, setUpdatedProfile] = useState<User | {}>({});
    const [deletedProfile, setDeletedProfile] = useState<User | {}>({});

    useEffect(() => {
        setProfilesData(profile);
        console.log(profile);

    }, [profile]);
    return (
        <>
            <GuruLayout>
                <div className={styles.certificates}>
                    <h1>Profiles Management</h1>
                    {!profilesData.profile ? <Button
                        type="button"
                        className={styles.certificates__add}
                        onClick={() => setModalAddProfile(profilesData)}
                    >
                        <i className="bx bx-plus" /> Add Profiles
                    </Button> :
                        ''
                    }
                    <table className={styles.certificates__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ktp</th>
                                <th>Category | SubCategory</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profilesData.profile ?
                                <tr>
                                    <td>{1}</td>
                                    <td>
                                        <Image
                                            src={profilesData.profile.ktp}
                                            alt={profilesData.profile.ktp}
                                            width={100}
                                            height={100}
                                        />
                                    </td>
                                    <td>{profilesData.profile.category} | {profilesData.profile.subcategory}</td>
                                    <td>
                                        {convertIDR(profilesData.profile.price)}
                                    </td>
                                    <td>{profilesData.profile_status}</td>
                                    <td>
                                        <div className={styles.certificates__table__action}>
                                            <Button
                                                type="button"
                                                className={styles.certificates__table__action__edit}
                                                onClick={() => setUpdatedProfile(profile)}
                                            >
                                                <i className="bx bx-pencil"></i>
                                            </Button>
                                            <Button
                                                type="button"
                                                className={styles.certificates__table__action__delete}
                                                onClick={() => setDeletedProfile(profile)}
                                            >
                                                <i className="bx bx-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                : ''
                            }
                        </tbody>
                    </table>
                </div>
            </GuruLayout>
            {modalAddProfile && (
                <ModalAddProfile
                    setModalAddProfile={setModalAddProfile}
                    setProfilesData={setProfilesData}
                    modalAddProfile={modalAddProfile}
                />
            )}
            {Object.keys(updatedProfile).length > 0 && (
                <ModalUpdatedProfile
                    setUpdatedProfile={setUpdatedProfile}
                    updatedProfile={updatedProfile}
                    setProfilesData={setProfilesData}
                />
            )}
            {Object.keys(deletedProfile).length > 0 && (
                <ModalDeleteProfile
                    setDeletedProfile={setDeletedProfile}
                    deletedProfile={deletedProfile}
                    setProfilesData={setProfilesData}
                />
            )}
        </>
    );
};

export default UploadProfilesGuruView;
