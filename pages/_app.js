import "../styles/globals.css";
import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";

export const GlobalContext = createContext({});


function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  return (
  <>
    <Head>
      <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
    </Head>
    {/* global will have data from strapi */}
    <GlobalContext.Provider value={global}>   
      <Component {...pageProps} />
    </GlobalContext.Provider>
  </>
  )
  return <Component {...pageProps} />;
}


MyApp.getInitialProps = async (context) => {   // get the props for MyApp
  const appProps = await App.getInitialProps(context);  // context here = { Component, pageProps } from MyApp above
  const global = await fetchAPI("/global");  // get something from Strapi, a request out to Strapi url
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
