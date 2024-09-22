import styles from "./Category.module.scss";
import Link from "next/link";
import { Profile } from "@/types/profile.type";
import { useState } from "react";
import Image from "next/image";
import convertIDR from "@/utils/currency";
import { User } from "@/types/user.type";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

type Proptypes = {
  gurus: User[];
};

const ProductView = (props: Proptypes) => {
    const { pathname, push } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Pilih Kategori</h1>
      <div className={styles.content__flex}>
        <Button onClick={() => push(`/products/Seni`)} type="button">Seni</Button>
        <Button onClick={() => push(`/products/Olahraga`)} type="button">Olahraga</Button>
        <Button onClick={() => push(`/products/Teknologi dan Komputer`)} type="button">Teknologi dan Komputer</Button>
        <Button onClick={() => push(`/products/Mengaji`)} type="button">Mengaji</Button>
      </div>
      </div>
    </div>
  );
};

export default ProductView;
