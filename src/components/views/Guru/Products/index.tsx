import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import convertIDR from "@/utils/currency";
import { Product } from "@/types/product.type";
import Image from "next/image";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  products: Product[];
};
const ProductsAdminView = (props: PropTypes) => {
  const { products } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h1>Products Management</h1>
          <Button
            type="button"
            className={styles.products__add}
            onClick={() => setModalAddProduct(true)}
          >
            <i className="bx bx-plus" /> Add Product
          </Button>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th rowSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => (
                <Fragment key={product.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      {convertIDR(product.price)}
                    </td>
                    <td>
                      <div className={styles.products__table__action}>
                        <Button
                          type="button"
                          className={styles.products__table__action__edit}
                          onClick={() => setUpdatedProduct(product)}
                        >
                          <i className="bx bx-edit"></i>
                        </Button>
                        <Button
                          type="button"
                          className={styles.products__table__action__delete}
                          onClick={() => setDeletedProduct(product)}
                        >
                          <i className="bx bx-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          setUpdatedProduct={setUpdatedProduct}
          updatedProduct={updatedProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
};

export default ProductsAdminView;
