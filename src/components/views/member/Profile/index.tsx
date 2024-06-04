import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";
import { uploadFile } from "@/lib/firebase/service";

const ProfileMemberView = ({ profile, setProfile }: any) => {
  const [changeImage, setChangeImage] = useState<any>({});
  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(profile.id, file, (newImageURL: string) => {
        setProfile({
          ...profile,
          image: newImageURL,
        })
      });
    }
  };
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          <Image src={profile.image} alt="Profile" width={200} height={200} />
          <form onSubmit={handleChangeProfilePicture}>
            <label
              className={styles.profile__main__avatar__label}
              htmlFor="upload-image"
            >
              {changeImage.name ? (
                <p>{changeImage.name}</p>
              ) : (
                <>
                  {" "}
                  <p>
                    Upload a new avatar, Larger image will be resized
                    automatically
                  </p>
                  <br />
                  <p>
                    {" "}
                    Maximum upload size is <b>1 MB</b>
                  </p>
                </>
              )}
            </label>
            <input
              className={styles.profile__main__avatar__input}
              type="file"
              name="image"
              id="upload-image"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
            />
            <Button
              type="submit"
              variant="primary"
              className={styles.profile__main__avatar__button}
            >
              Upload
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
            <Input
              label="Fullname"
              type="text"
              name="fullname"
              defaultValue={profile.fullname}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              defaultValue={profile.email}
            />
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.phone}
            />
            {/* <Input
            label="Password"
            type="password"
            name="password"
            defaultValue={profile.password}
          /> */}
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
