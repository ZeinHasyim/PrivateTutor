import CartView from "@/components/views/Cart";
import Head from "next/head";

const CartPage = () => {
  return (
    <div>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView />
    </div>
  );
};
export default CartPage;
