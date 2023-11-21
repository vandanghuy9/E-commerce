/* eslint-disable react-hooks/exhaustive-deps */
import { StateContext } from "@/context/StateContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "./components";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    router.push("/signin");
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <StateContext>
      {!loading &&
        (["/signin", "/signup"].includes(pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        ))}
    </StateContext>
  );
}

// component la bat ki component nao
// neu dang o trang chu thi la index
// neu la product thi se la product
// Layout nhan props = children
