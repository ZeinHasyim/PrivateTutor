import ProductsEditorView from "@/components/views/Admin/Products";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return <ProductsEditorView products={products}  />;
};

export default AdminProductsPage;
