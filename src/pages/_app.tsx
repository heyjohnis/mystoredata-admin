import type {AppProps} from "next/app";
import {AppContext} from "next/app";
import Head from "next/head";
import {Provider} from "react-redux";
import Layout from "@/layouts";
import store from "@/store";
import Router from "next/router";
import NProgress from "nprogress";
import cookie from "js-cookie";
import "@/css/tailwind.css";
import "@/css/main.css";
import "@/css/layouts/layout-1.css";
import "@/css/layouts/e-commerce.css";
import "@/css/animate.css";
import "@/css/components/left-sidebar-1/styles-lg.css";
import "@/css/components/left-sidebar-1/styles-sm.css";
import "@/css/components/nprogress.css";
import "@/css/components/recharts.css";
import "@/css/components/steps.css";
import "@/css/components/left-sidebar-3.css";
import {useEffect} from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({Component, pageProps}: AppProps): React.ReactElement => {
  useEffect(() => {
    const token = cookie.get("token");
    if (!token) {
      Router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

export default App;
