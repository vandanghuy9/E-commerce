import styles from "@/styles/changepw.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { SignInSchema } from "@/validations/AuthenticationSchema";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialData = {
  email: "",
  password: "",
};

const SignIn = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: initialData,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
    router.push("/"); // Redirect upon successful login
  };

  return (
    <div className="flex flex-row h-[100vh]">
      <div className={`${styles.w60}`}>
        <div className={styles.form_login}>
        <h1 className={styles.changepw}>Change password</h1>
          
          
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.mb_2}>
                <input
                  className={`${styles.fullwidth} ${styles.input_style}`}
                  placeholder="Password"
                />
                
              </div>
              <div className={styles.mb_2}>
                <input
                  className={`${styles.fullwidth} ${styles.input_style}`}
                  placeholder="Confirm Password"
                />
                
              </div>
              <button
                className={`${styles.btn_style} ${styles.fullwidth} ${styles.mb_2}`}
                
              >
                <Link href="/signin">Submit</Link>
              </button>
            </form>
          </FormProvider>
          
        </div>
      </div>
    
    </div>
  );
};

export default SignIn;
