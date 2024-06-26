import styles from "./Products.module.scss";
import { Product } from "@/types/product.type";
import Card from "./Card";
import Link from "next/link";

type Proptypes = {
  products: Product[];
};

const ProductView = (props: Proptypes) => {
  const { products } = props;
  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>All Products {products.length}</h1>
      <div className={styles.product__main}>
        <div className={styles.product__main__filter}>
          <div className={styles.product__main__filter__data__title}></div>
          <div className={styles.product__main__filter__data}>
            <h4 className={styles.product__main__filter__data__title}>
              Gender
            </h4>
            <div className={styles.product__main__filter__data__list}>
              <div className={styles.product__main__filter__data__list__item}>
                <input type="checkbox" id="men" />
                <label
                  htmlFor="men"
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                >
                  Men
                </label>
              </div>
              <div className={styles.product__main__filter__data__list__item}>
                <input type="checkbox" id="women" />
                <label
                  htmlFor="women"
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                >
                  Women
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.product__main__content}>
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
