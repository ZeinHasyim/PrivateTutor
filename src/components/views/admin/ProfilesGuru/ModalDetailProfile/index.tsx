import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDetailProfile.module.scss";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import convertIDR from "@/utils/currency";

type Proptypes = {
  detailProfile: User | any;
  setDetailProfile: Dispatch<SetStateAction<boolean>>;
  setProfilesGuruData: Dispatch<SetStateAction<User[]>>;
};

const ModalDetailProfile = (props: Proptypes) => {
  const { detailProfile, setDetailProfile, setProfilesGuruData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pengalamanCount, setPengalamanCount] = useState(
    detailProfile.profile.pengalaman
  );


  const updateProfileStatus = async (profile_status: any) => {
    const data = {
      profile_status: profile_status,
    };

    const result = await userServices.updateUser(detailProfile.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setDetailProfile(false);
      const { data } = await userServices.getAllProfileUsers();
      const profilesGuru = data.data;
      const filteredData = profilesGuru.filter(
        (item: any) => item.profile_status && item.profile_status.trim() !== ""
      );

      setProfilesGuruData(filteredData);
      setToaster({
        variant: "success",
        message: "Action Success",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Action Failed",
      });
    }
  };

  const updateStatus = async (event: any) => {
    setIsLoading(true);
    updateProfileStatus(event.target.value);
  };
  return (
    <Modal onClose={() => setDetailProfile(false)}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Detail Profile
      </h1>
      <div className={styles.profile}>
        <div className={styles.profile__border}>
          <div className={styles.profile__profilePicture}>
            <h2>Photo Profile</h2>
            <Image
              src={detailProfile?.image}
              alt="profile"
              width={200}
              height={200}
              className={styles.profile__profilePicture__image}
            />
            <h3>{detailProfile.fullname}</h3>
            <h4>{detailProfile.gender}</h4>
            <div className={styles.profile__border}>
              <div className={styles.profile__KTP}>
                <h2>KTP</h2>
                <Image
                  layout="responsive"
                  width={100}
                  height={100}
                  src={detailProfile.profile.ktp}
                  alt="image"
                  className={styles.form__image_preview}
                />
              </div>
              <div className={styles.profile__border__name}>
                <p>{convertIDR(detailProfile?.profile.price)}/Pertemuan</p>
                <p>{detailProfile.phone}</p>
                <p>{detailProfile.email}</p>
                <p>{detailProfile.role}</p>
                <p>{detailProfile.profile.category} | {detailProfile.profile.subcategory}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profile__description}>
          <h1 style={{ marginBottom: "20px", textAlign: "center" }}>About Me</h1>
          <p>{detailProfile.profile.description}</p>
          <div className={styles.profile__description}>
            <h2>Pengalaman</h2>
            {pengalamanCount.map(
              (item: { name: string; year: number }, i: number) => {
                return (
                  <div className={styles.form__stock} key={i}>
                    <div className={styles.form__stock__item}>
                      <p>{item.name}</p>
                      <p>Sejak Tahun {item.year}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className={styles.profile__certificate}>
          <h2>Certificate</h2>
          <div className={styles.profile__certificate__image}>
            {detailProfile.profile.certificate.map((certificate: any) => (
              <Image
                key={certificate.id}
                layout="responsive"
                width={100}
                height={100}
                src={certificate.file}
                alt={certificate.file}
                className={styles.profile__certificate__image__preview}
              />
            ))}
          </div>
        </div>
        <h4>Status Profile</h4>
        <p style={{ marginBottom: "40px"}}>{detailProfile.profile_status}</p>

        <div className={styles.form__button_flex}>
          <input
            className={styles.form__button_flex__btn_aprove}
            type="button"
            onClick={updateStatus}
            name="status"
            value={isLoading ? "Loading..." : "Aprove"}
            disabled={isLoading}
          />
          <input
            className={styles.form__button_flex__btn_decline}
            type="button"
            onClick={updateStatus}
            name="status"
            value={isLoading ? "Loading..." : "Decline"}
            disabled={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};
export default ModalDetailProfile;
