import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import styles from "./ModalUpdateCertificate.module.scss";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import InputFile from "@/components/ui/InputFile";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import { ToasterContext } from "@/contexts/ToasterContext";
import { Profile } from "@/types/profile.type";
import profilesServices from "@/services/profiles";
import Textarea from "@/components/ui/Textarea";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { Certificate } from "crypto";
import { useRouter } from "next/router";

type Proptypes = {
    setUpdatedProfile: Dispatch<SetStateAction<boolean>>;
    setProfilesData: Dispatch<SetStateAction<User[]>>;
    updatedProfile: User | any;
};

const ModalUpdatedProfile = (props: Proptypes) => {
    const { updatedProfile, setUpdatedProfile, setProfilesData } = props;
    const { setToaster } = useContext(ToasterContext);
    const [isLoading, setIsLoading] = useState(false);
    const [previewKtp, setPreviewKtp] = useState<File | null>(null);
    const [pengalamanCount, setPengalamanCount] = useState(
        updatedProfile.profile.pengalaman
    );
    const [dayCount, setDayCount] = useState(
        updatedProfile.profile.day
    );
    console.log(dayCount);


    const handlePengalaman = (e: any, i: number, type: string) => {
        const newPengalamanCount: any = [...pengalamanCount];
        newPengalamanCount[i][type] = e.target.value;
        setPengalamanCount(newPengalamanCount);
    };
    const handleDay = (e: any, i: number, type: string) => {
        const newDayCount: any = [...dayCount];
        newDayCount[i][type] = e.target.value;
        setDayCount(newDayCount);
    };

    const uploadKtp = () => {
        const input = document.getElementById("ktp") as HTMLInputElement | null;
        if (input) {
            input.click();
        }
    };
    const handleKtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewKtp(file);
        }
    };
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // setIsLoading(true);
        const form: any = event.target as HTMLFormElement;

        const multiCertif = Array.from(form.certificate.files);
        let uploadedCertificate: { file: string }[] = [];
        if (multiCertif) {
            const uploadFilePromise = (file: any): Promise<string> => {
                const certifName =
                    file.name.split(".")[0] + "." + file.name.split(".")[1];
                return new Promise<string>((resolve, reject) => {
                    uploadFile(
                        updatedProfile.id,
                        file,
                        certifName,
                        "profiles/certificate",
                        (status: boolean, newImageURL: string) => {
                            resolve(newImageURL);
                        }
                    );
                });
            };
            const urls = await Promise.all(multiCertif.map(uploadFilePromise));
            uploadedCertificate.push(...urls.map((url) => ({ file: url })));
        }

        const ktp = form.ktp.files[0];
        let uploadedKtp: string = "";
        if (ktp) {
            const uploadKtpPromise = (ktp: any): Promise<string> => {
                const ktpName = "main." + ktp.name.split(".")[1];
                return new Promise<string>((resolve, reject) => {
                    uploadFile(
                        updatedProfile.id,
                        ktp,
                        ktpName,
                        "profiles/ktp",
                        (status: boolean, newImageURL: string) => {
                            if (status) {
                                resolve(newImageURL);
                            } else {
                                reject("Failed to upload file");
                            }
                        }
                    );
                });
            };
            uploadedKtp = await uploadKtpPromise(ktp);
        } else {
            uploadedKtp = updatedProfile.profile.ktp;
        }

        const pengalaman = pengalamanCount.map(
            (pengalaman: { name: string; year: number }) => {
                return {
                    name: pengalaman.name,
                    year: parseInt(`${pengalaman.year}`),
                };
            }
        );
        const day = dayCount.map(
            (day: { hari: string; jam: string }) => {
                return {
                    hari: day.hari,
                    jam: day.jam,
                };
            }
        );

        const data = {
            profile: {
                category: form.category.value,
                description: form.description.value,
                price: form.price.value,
                certificate:
                    uploadedCertificate.length > 0
                        ? uploadedCertificate.length
                        : updatedProfile.profile.certificate,
                pengalaman: pengalaman,
                day: day,
                ktp: uploadedKtp,
            },
            profile_status: "pending",
        };

        const result = await userServices.updateProfile(data);
        if (result.status === 200) {
            setUpdatedProfile(false);
            const { data } = await userServices.getProfile();
            setProfilesData(data.data);
            setToaster({
                variant: "success",
                message: "Success Updated Profile",
            });
            window.location.reload();
        }
    };
    return (
        <Modal onClose={() => setUpdatedProfile(false)}>
            <h1>Updated Profile</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Select
                    label="Category"
                    name="category"
                    defaultValue={updatedProfile.profile.category}
                    options={[
                        { label: "", value: "" },
                        { label: "Seni", value: "Seni" },
                        { label: "Olahraga", value: "Olahraga" },
                        {
                            label: "Teknologi dan Komputer",
                            value: "Teknologi dan Komputer",
                        },
                        { label: "Mengaji", value: "Mengaji" },
                    ]}
                    className={styles.form__input}
                />
                <Select
                    label="Sub Category"
                    name="subcategory"
                    defaultValue={updatedProfile.profile.subcategory}
                    options={[
                        { label: "", value: "" },
                        { label: "Seni Lukis", value: "Seni Lukis" },
                        { label: "Seni Tari", value: "Seni Tari" },
                        {
                            label: "Musik",
                            value: "Musik",
                        },
                        { label: "Berenang", value: "Berenang" },
                        { label: "Basket", value: "Basket" },
                        { label: "Badminton", value: "Badminton" },
                        { label: "Robotik Dasar", value: "Robotik Dasar" },
                        { label: "Desain Dasar", value: "Desain Dasar" },
                        { label: "Programming Dasar", value: "Programming Dasar" },
                        { label: "Tajwid", value: "Tajwid" },
                        { label: "Tilawah", value: "Tilawah" },
                    ]}
                    className={styles.form__input}
                />
                <Input
                    label="Price"
                    name="price"
                    type="text"
                    placeholder="Insert Price"
                    defaultValue={updatedProfile.profile.price}
                    className={styles.form__input}
                />
                <label htmlFor="ktp">Ktp</label>
                <div className={styles.form__image}>
                    <div onClick={uploadKtp} className={styles.form__image__placeholder}>
                        {previewKtp ? (
                            <Image
                                width={200}
                                height={200}
                                src={URL.createObjectURL(previewKtp)}
                                alt="ktp"
                                className={styles.form__image_preview}
                            />
                        ) : (
                            <>
                                <Image
                                    width={200}
                                    height={200}
                                    src={updatedProfile.profile.ktp}
                                    alt="ktp"
                                    className={styles.form__image_preview}
                                />
                                <button type="button">Upload Ktp</button>
                            </>
                        )}
                    </div>
                    <input
                        className={styles.form__image__hidden}
                        name="Ktp"
                        id="ktp"
                        type="file"
                        onChange={handleKtpChange}
                    />
                </div>
                <label htmlFor="Certificate">Certificate</label>
                <div className={styles.form__image}>
                    {updatedProfile.profile.certificate.map((certificate: any) => (
                        <Image
                            key={certificate.file}
                            layout="responsive"
                            width={100}
                            height={100}
                            src={certificate.file}
                            alt={certificate.file}
                        />
                    ))}
                </div>
                <div className={styles.form__image}>
                    <input
                        name="certificate"
                        type="file"
                        multiple
                        placeholder="Insert Certificate"
                    />
                </div>
                <label htmlFor="pengalaman">Pengalaman</label>
                {pengalamanCount.map(
                    (item: { name: string; year: number }, i: number) => {
                        return (
                            <div className={styles.form__stock} key={i}>
                                <div className={styles.form__stock__item}>
                                    <Input
                                        label="Name"
                                        name="name"
                                        type="text"
                                        placeholder="Insert Name"
                                        onChange={(e) => {
                                            handlePengalaman(e, i, "name");
                                        }}
                                        defaultValue={item.name}
                                        className={styles.form__input}
                                    />
                                </div>
                                <div className={styles.form__stock__item}>
                                    <Input
                                        label="Year"
                                        name="year"
                                        type="number"
                                        placeholder="Insert Year"
                                        onChange={(e) => {
                                            handlePengalaman(e, i, "year");
                                        }}
                                        defaultValue={item.year}
                                        className={styles.form__input}
                                    />
                                </div>
                            </div>
                        );
                    }
                )}
                <Button
                    type="button"
                    className={styles.form__stock__button}
                    onClick={() =>
                        setPengalamanCount([...pengalamanCount, { name: "", year: 0 }])
                    }
                >
                    Tambah Pengalaman
                </Button>
                <label htmlFor="day">Day</label>
                {dayCount.map(
                    (item: { hari: string; jam: string }, i: number) => {
                        return (
                            <div className={styles.form__stock} key={i}>
                                <div className={styles.form__stock__item}>
                                    <Input
                                        label="Hari"
                                        name="hari"
                                        type="text"
                                        placeholder="Insert Hari"
                                        onChange={(e) => {
                                            handleDay(e, i, "hari");
                                        }}
                                        defaultValue={item.hari}
                                        className={styles.form__input}
                                    />
                                </div>
                                <div className={styles.form__stock__item}>
                                    <Input
                                        label="Jam"
                                        name="jam"
                                        type="time"
                                        placeholder="Insert Jam"
                                        onChange={(e) => {
                                            handleDay(e, i, "jam");
                                        }}
                                        defaultValue={item.jam}
                                        className={styles.form__input}
                                    />
                                </div>
                            </div>
                        );
                    }
                )}
                <Button
                    type="button"
                    className={styles.form__stock__button}
                    onClick={() =>
                        setDayCount([...dayCount, { hari: "", jam: "" }])
                    }
                >
                    Tambah Hari
                </Button>
                <Textarea
                    label="Description"
                    name="description"
                    placeholder="Insert Profile Description"
                    defaultValue={updatedProfile.profile.description}
                    className={styles.form__input}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Updated Profile"}
                </Button>
            </form>
        </Modal>
    );
};
export default ModalUpdatedProfile;
