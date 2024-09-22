import styles from "./SubCategory.module.scss";
import Link from "next/link";
import { Profile } from "@/types/profile.type";
import { useEffect, useState } from "react";
import Image from "next/image";
import convertIDR from "@/utils/currency";
import { User } from "@/types/user.type";

type Proptypes = {
  gurus: User[];
  category: any;
};

const SubCategoryView = (props: Proptypes) => {
  const { gurus, category } = props;

  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);

  // Fungsi untuk menangani klik kategori
  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  // Filter guru berdasarkan kategori yang dipilih
  const filteredGurus = gurus.filter(
    (guru) =>
      selectedCategory === "" || guru.profile.subcategory === selectedCategory
  );

  const headerText = selectedCategory
    ? `Guru ${selectedCategory} (${filteredGurus.length})`
    : `All Guru (${filteredGurus.length})`;

  useEffect(() => {
    let newSubcategories: string[] = [];

    if (category === "Seni") {
      newSubcategories = ["Seni Lukis", "Seni Tari", "Musik"];
    } else if (category === "Olahraga") {
      newSubcategories = ["Berenang", "Basket", "Badminton"];
    } else if (category === "Teknologi dan Komputer") {
      newSubcategories = ["Robotik Dasar", "Desain Dasar", "Programming Dasar"];
    } else if (category === "Mengaji") {
      newSubcategories = ["Tajwid", "Tilawah"];
    }

    setSubcategories(newSubcategories);
  }, [category]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{headerText}</h1>
        <div className={styles.header__change_category}>
          <a
            href="#"
            className={
              selectedCategory === ""
                ? styles.header__change_category__category__active
                : styles.header__change_category__category
            }
            onClick={() => handleCategoryClick("")}
          >
            All
          </a>
          {subcategories.map((subcategory) => (
            <a
              key={subcategory}
              href="#"
              className={
                selectedCategory === subcategory
                  ? styles.header__change_category__category__active
                  : styles.header__change_category__category
              }
              onClick={() => handleCategoryClick(subcategory)}
            >
              {subcategory}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.content__row}>
          {filteredGurus.map((guru: any) => (
            <div className={styles.content__row__col} key={guru.id}>
              <Link key={guru.id} href={`/detailproduct/${guru.id}`}>
                <div className={styles.content__row__col__card}>

                  <Image
                    layout="fill"
                    className={styles.content__row__col__card__card_img_top}
                    src={guru.image}
                    alt={guru.image}
                  />
                  <div className={styles.content__row__col__card__card_body}>
                    <h5
                      className={
                        styles.content__row__col__card__card_body__card_title
                      }
                    >
                      {guru.fullname}
                    </h5>

                     <p style={{fontWeight: 'bold', textAlign: 'center'}}> {guru.profile.subcategory} </p>
                    
                    <p
                      className={
                        styles.content__row__col__card__card_body__card_price
                      }
                    >
                      Price : {convertIDR(guru.profile.price)}
                    </p>
                    <div className={styles.pengalaman_wrapper}>
                      <h4 className={styles.pengalaman_title}>Pengalaman :</h4>
                      <div>
                        {guru?.profile?.pengalaman.map((pengalaman: any) => (
                          <div key={pengalaman.id}>
                            - {pengalaman.name} ({pengalaman.year} tahun)
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryView;
