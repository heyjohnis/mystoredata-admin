import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (token: string, goto = "") => {
  cookie.set("token", token);
  Router.push(goto);
};

// export const redirectUser = (ctx, location) => {
//   if (ctx.req) {
//     ctx.res.writeHead(302, { Location: location });
//     ctx.res.end();
//   } else {
//     Router.push(location);
//   }
// };

export const handleLogout = () => {
  cookie.remove("medq_token");
  const now: Date = new Date(); // 현재 시간으로 Date 객체 생성
  window.localStorage.setItem("logout", now.getTime().toString());
  Router.push("/");
};
