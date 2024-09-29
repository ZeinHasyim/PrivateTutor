import { useRouter } from "next/router";
import styles from "./Register.module.scss";
import { FormEvent, useContext, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ToasterContext } from "@/contexts/ToasterContext";
import Select from "@/components/ui/Select";
const RegisterView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setisLoading] = useState(false);

  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisLoading(true);
    
    const form = event.target as HTMLFormElement;
  
    // Mengakses elemen form dengan nama yang sesuai
    const emailElement = form.elements.namedItem('email') as HTMLInputElement | null;
    const fullnameElement = form.elements.namedItem('fullname') as HTMLInputElement | null;
    const phoneElement = form.elements.namedItem('phone') as HTMLInputElement | null;
    const passwordElement = form.elements.namedItem('password') as HTMLInputElement | null;
    const genderElement = form.elements.namedItem('gender') as HTMLSelectElement | null;
    const roleElement = form.elements.namedItem('role') as HTMLSelectElement | null;
  
    // Memeriksa apakah semua elemen ada
    if (!emailElement || !fullnameElement || !phoneElement || !passwordElement || !genderElement || !roleElement) {
      setisLoading(false);
      setToaster({
        variant: "danger",
        message: "All fields are required",
      });
      return;
    }
  
    const data = {
      email: emailElement.value,
      fullname: fullnameElement.value,
      phone: phoneElement.value,
      password: passwordElement.value,
      gender: genderElement.value,
      role: roleElement.value
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
      console.log(error);
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
        <Input
          className={styles.register__input}
          label="Email"
          name="email"
          type="email"
        />
        <Input
          className={styles.register__input}
          label="Fullname"
          name="fullname"
          type="text"
        />
        <Input
          className={styles.register__input}
          label="Phone"
          name="phone"
          type="number"
        />
        <Input
          className={styles.register__input}
          label="Password"
          name="password"
          type="password"
        />
        <Select
          className={styles.register__input}
          label="Gender"
          name="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <Select
          className={styles.register__input}
          label="Role"
          name="role"
          options={[
            { label: "Member", value: "member" },
            { label: "Guru", value: "guru" },
          ]}
        />
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
