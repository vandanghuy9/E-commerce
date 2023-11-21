/* eslint-disable react-hooks/exhaustive-deps */
import styles from "@/styles/signin.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const initialData = {
  email: "",
  password: "",
};
const SignIn = () => {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(data);
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `Vui lòng nhập ${key}`,
        }));
        validates = false;
      }
      if (validates) {
        router.push("/");
      }
    });
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.w60}`}>
        <div className={styles.form_login}>
          <h1>Sign in to Dafo</h1>
          <div className={`${styles.icons} ${styles.my_3}`}>
            <FaFacebookF className={styles.border_icon} />
            <FaGoogle className={styles.border_icon} />
          </div>
          <p className={`${styles.text_secondary} ${styles.mb_2}`}>
            or use your email account
          </p>
          <div className={styles.mb_2}>
            <input
              className={`${styles.fullwidth} ${styles.input_style}`}
              type="text"
              name="email"
              placeholder="Email"
              defaultValue={data.email}
              onChange={handleChange}
            />
            {error.email && (
              <small className={styles.text_error}>{error.email}</small>
            )}
          </div>
          <div className={styles.mb_2}>
            <input
              className={`${styles.fullwidth} ${styles.input_style}`}
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={data.password}
              onChange={handleChange}
            />
            {error.password && (
              <small className={styles.text_error}>{error.password}</small>
            )}
          </div>
          <button
            className={`${styles.btn_style} ${styles.fullwidth} ${styles.mb_2}`}
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <div className={`${styles.text_right}`}>
            <Link href="#">Forgot password?</Link>
          </div>
        </div>
      </div>
      <div className={`${styles.w40} ${styles.bg_black}`}>
        <div className={styles.content_signup}>
          <h1>Hello friend</h1>
          <p className={`${styles.my_3} ${styles.text_secondary}`}>
            Enter personal details and start your journey
          </p>
          <button className={`${styles.btn_style} ${styles.mb_2}`}>
            <Link href="/signup">Sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
