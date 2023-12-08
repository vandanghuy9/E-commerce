import styles from "@/styles/forgotpassword.module.css";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordSchema } from "@/validations/AuthenticationSchema";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'


const ForgotPassword = () => {
  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
    // You can add logic to send a reset password email
  };

// ...

return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square}>
        <FontAwesomeIcon icon={faKey} style={{ fontSize: '5.5em' }} />

          <h1 className={styles.forgotPasswordText}>Reset password</h1>
          <p className={styles.smallText}>
            What would you like your new {" "}
            <br />
            password to be
          </p>{" "}
            <br />
            <div className={styles.mb_2}>
              <input
                className={`${styles.fullwidth} ${styles.input_style}`}
                type="text"
                placeholder="New password"
            />
            </div>
            <div className={styles.mb_2}>
              <input
                className={`${styles.fullwidth} ${styles.input_style}`}
                type="text"
                placeholder="Confirm new password"
            />
            </div>

            <div className={`${styles.saven_style}`}>
               
               <button className={`${styles.save_button}`} onClick={handleSubmit(onSubmit)}>
               <Link href="/signin">Save</Link>               
               </button>
               
            </div>
            
        </div>
      </div>
    </div>
  );
  
  // ...
  
  
  
  
};

export default ForgotPassword;
