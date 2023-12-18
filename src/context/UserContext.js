import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  use,
} from "react";
import { toast } from "react-hot-toast";
import { getShowingProduct, login, signup } from "@/utils/api";
import { useRouter } from "next/router";
const Context = createContext();

const UserContext = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = async (data) => {
    try {
      const user = await login(data);
      await sessionStorage.setItem("user", user.user._id);
      await setIsLogin(true);
      await toast.success("welcome" + user.user._id);
      await router.back();
    } catch (e) {
      console.log(e);
    }
  };
  const checkIsLogin = () => {
    return isLogin;
  };
  const handleSignup = async (email, password, username) => {
    try {
      const newUser = await signup(email, password);
      await sessionStorage.setItem("user", newUser?.userID);
      await setIsLogin(true);
      await toast.success("welcome " + newUser?.userID);
      await router.back();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Context.Provider value={{ user, checkIsLogin, handleLogin, handleSignup }}>
      {children}
    </Context.Provider>
  );
};
export default UserContext;
export const useUserContext = () => useContext(Context);
