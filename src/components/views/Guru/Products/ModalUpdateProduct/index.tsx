import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import styles from "./ModalUpdateProduct.module.scss";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import { ToasterContext } from "@/contexts/ToasterContext";
import productServices from "@/services/product";

type Proptypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const { updatedProduct, setUpdatedProduct, setProductsData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image
  ) => {
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      image: newImageURL,
    };
    const result = await productServices.updateProduct(updatedProduct.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Product",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Product",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Update Product",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };
  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert Product Name"
          defaultValue={updatedProduct.name}
          className={styles.form__input}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          defaultValue={updatedProduct.price}
          className={styles.form__input}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          placeholder="Insert Product Description"
          defaultValue={updatedProduct.description}
          className={styles.form__input}
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Mata Pelajaran Akademik", value: "Mata Pelajaran Akademik" },
            { label: "Bahasa Asing", value: "Bahasa Asing" },
            { label: "Musik", value: "Musik" },
            { label: "Seni", value: "Seni" },
            { label: "Olahraga", value: "Olahraga" },
            {
              label: "Teknologi dan Komputer",
              value: "Teknologi dan Komputer",
            },
            { label: "Persiapan Ujian", value: "Persiapan Ujian" },
          ]}
          className={styles.form__input}
        />
        <Select
          label="status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
          className={styles.form__input}
        />

        <label htmlFor="image">Image</label>
        <div className={styles.form__image}>
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="image"
            className={styles.form__image_preview}
          />

          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Update Product"}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalUpdateProduct;
