import { UpOutlined } from "@ant-design/icons";
import { BackTop, Button, Layout } from "antd";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { Router } from "next/dist/client/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import HeaderContent from "../src/components/HeaderContent/HeaderContent";
import store from "../src/store/store";
import "../styles/global.scss";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 80,
});

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
  window.scrollTo(0, 0);
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
  window.scrollTo(0, 0);
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Layout.Header className="app_header">
          <HeaderContent />
        </Layout.Header>
      </Layout>
      <div className="header_gap"></div>
      <div className="container">
        <Component {...pageProps} />
      </div>
      <BackTop>
        <Button
          type="primary"
          size="large"
          shape="circle"
          icon={<UpOutlined />}
        ></Button>
      </BackTop>
    </Provider>
  );
}
