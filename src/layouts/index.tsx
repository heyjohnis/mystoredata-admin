import {useEffect} from "react";
import {useRouter} from "next/router";
import Centered from "@/layouts/centered";
import Admin from "@/layouts/admin";
import User from "@/layouts/user";
import ECommerce from "@/layouts/e-commerce";
import {setConfig} from "@/slices/config";
import {useHotkeys} from "react-hotkeys-hook";
import {useAppSelector, useAppDispatch} from "@/store";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layouts: React.FC<LayoutProps> = ({children}) => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.config);
  const {background} = config;

  useEffect(() => {
    const root = window.document.documentElement;
    const backgroundClass = background === "light" ? "dark" : "light";
    root.classList.remove(backgroundClass);
    root.classList.add(background);
  }, [background]);

  useHotkeys(
    "ctrl+i",
    () => {
      const root = window.document.documentElement;
      const backgroundClass = background === "light" ? "dark" : "light";
      root.classList.remove(backgroundClass);
      root.classList.add(background);
      dispatch(
        setConfig({
          background: backgroundClass,
        })
      );
    },
    [background]
  );

  const router = useRouter();
  console.log(router);
  const {pathname} = router;
  switch (pathname) {
    case "/404":
    case "/500":
      return <Centered>{children}</Centered>;
    case "/login-1":
    case "/contact-us-1":
    case "/create-account":
    case "/email-confirmation":
    case "/logout":
    case "/reset-password":
    case "/forgot-password":
    case "/lock-screen":
    case "/subscribe":
    case "/error-page":
    case "/coming-soon":
      return <Centered>{children}</Centered>;
    case "/landing":
    case "/login-2":
    case "/login-3":
    case "/sidebars":
    case "/login":
    case "/admin/login":
      return <>{children}</>;
    case "/e-commerce":
      return <ECommerce>{children}</ECommerce>;
    default:
      if (pathname.indexOf("/admin") > -1) return <Admin>{children}</Admin>;
      return <User>{children}</User>;
  }
};

export default Layouts;
