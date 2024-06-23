import { useRouter } from "next/router";
import styles from "./Register.module.scss";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
const RegisterView = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  const [isLoading, setisLoading] = useState(false);

  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setisLoading(false);
        push("/auth/login");
        setToaster({
          variant: "success",
          message: "Register success",
        });
      } else {
        setisLoading(false);
        setToaster({
          variant: "danger",
          message: "Register failed",
        });
      }
    } catch (error) {
      setisLoading(false);
      setToaster({
        variant: "danger",
        message: "Register failed, email is already exist",
      });
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account? Sign in "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input className={styles.register__input} label="Email" name="email" type="email" />
        <Input className={styles.register__input} label="Fullname" name="fullname" type="text" />
        <Input className={styles.register__input} label="Phone" name="phone" type="number" />
        <Input className={styles.register__input} label="Password" name="password" type="password" />
        <Button
          type="submit"
          className={styles.register__button}
          variant="primary"
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
