/* eslint-disable react-hooks/exhaustive-deps */
import { StateContext } from "@/context/StateContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "../components/components";
import UserContext from "@/context/UserContext";
import Script from "next/script";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.socialintents.com/api/socialintents.1.3.js#2c9faa358c852b2a018c9b1a4bcb0b2b"
        async="async"
      />
      <UserContext>
        <StateContext>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </StateContext>
      </UserContext>
    </>
  );
}
