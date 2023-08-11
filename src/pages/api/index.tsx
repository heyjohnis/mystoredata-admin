import axios from 'axios';
import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (token: string, goto="") => {
  cookie.set("token", token);
  Router.push("/" + goto);
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const handleLogout = () => {
  cookie.remove("medq_token");
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};


export async function get (req, res) {
    
    const { data } = await axios.get('http://localhost:3000/api/now');
    res.json(data);
};
