import Button from "@/components/ui/Button";
import styles from "./Success.module.scss";
import { useRouter } from "next/router";
const SuccessView = () => {
  const {push} = useRouter()
  return (
    <div className={styles.success}>
      <h1>Payment Success</h1>
      <Button type="button" onClick={() => push("/member/pembelajaran")}>Check Your Pembelajaran Here</Button>
    </div>
  );
};
export default SuccessView;
