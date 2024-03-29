import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (token: string, goto = "") => {
  cookie.set("token", token);
  Router.push("/" + goto);
};

export const redirectUser = (ctx: any, location: any) => {
  if (ctx.req) {
    ctx.res.writeHead(302, {Location: location});
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const handleLogout = () => {
  cookie.remove("medq_token");
  window.localStorage.setItem("logout", Date.now().toString());
  Router.push("/");
};
