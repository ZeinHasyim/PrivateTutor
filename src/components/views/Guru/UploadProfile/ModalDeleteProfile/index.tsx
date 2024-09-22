import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteCertificate.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import certificateServices from "@/services/profiles";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { Profile } from "@/types/profile.type";
import profilesServices from "@/services/profiles";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { Certificate } from "crypto";

type Proptypes = {
    setProfilesData: Dispatch<SetStateAction<User[]>>;
    setDeletedProfile: Dispatch<SetStateAction<{}>>;
    deletedProfile: User | any;
};

const ModalDeleteProfile = (props: Proptypes) => {
    const { deletedProfile, setDeletedProfile, setProfilesData } =
        props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        const data = {
            profile: "",
            profile_status: "pending"
        };
        if (deletedProfile.profile.ktp != "") {
            deleteFile(
                `/images/profiles/ktp/${deletedProfile.id}/${deletedProfile.profile.ktp.split("%2F")[4].split("?")[0]
                }`,
                async (status: boolean) => {
                    if (status) {
                    }
                }
            );
        }
        if (deletedProfile.profile.certificate != "") {
            {
                deletedProfile.profile.certificate.map((certificate: any) => (
                    deleteFile(
                        `/images/profiles/certificate/${deletedProfile.id}/${certificate.file.split("%2F")[4].split("?")[0]
                        }`,
                        async (status: boolean) => {
                        }
                    )
                ))
            }
        }
        const result = await userServices.updateProfile(data);
        if (result.status === 200) {
            setIsLoading(false);
            setDeletedProfile(false)
            setToaster({
                variant: "success",
                message: "Success Delete Profile",
            });
            const { data } = await userServices.getProfile();
            setProfilesData(data.data);
        } else {
            setIsLoading(false);
            setToaster({
                variant: "danger",
                message: "Failed Delete Profile",
            });
        }
    };
    return (
        <Modal onClose={() => setDeletedProfile({})}>
            <div>
                <h1 className={styles.modal__title}>Are You Sure?</h1>
                <Button type="button" onClick={() => handleDelete()}>
                    {isLoading ? "Deleting..." : "Yes, Delete"}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalDeleteProfile
