import axios, {AxiosResponse} from "axios";
import cookie from "js-cookie";
import Router from "next/router";

export async function POST(uri: string, data: any): Promise<any> {
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8089";
  const token = cookie.get("token");
  const url = `${serverURL}${uri}`;
  return axios({
    method: "post",
    url,
    headers: {Authorization: `Bearer ${token}`},
    data,
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response.status === 401) {
        Router.push("/login");
      }
      if (error.response?.data?.error?.message) {
        alert(error.response.data.error.message);
      }
    });
}

export async function GET(uri: string): Promise<any> {
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8089";
  const token = cookie.get("token");
  const url = `${serverURL}${uri}`;
  return axios({
    method: "get",
    url,
    headers: {Authorization: `Bearer ${token}`},
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response.status === 401) {
        Router.push("/login");
      }
      if (error.response?.data?.error?.message) {
        alert(error.response.data.error.message);
      }
    });
}

export async function PUT(uri: string, data: any): Promise<any> {
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8089";
  const token = cookie.get("token");
  const url = `${serverURL}${uri}`;
  return axios({
    method: "put",
    url,
    headers: {Authorization: `Bearer ${token}`},
    data,
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response.status === 401) {
        Router.push("/login");
      }
      if (error.response?.data?.error?.message) {
        alert(error.response.data.error.message);
      }
    });
}

export async function DELETE(uri: string): Promise<any> {
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8089";
  const token = cookie.get("token");
  const url = `${serverURL}${uri}`;
  return axios({
    method: "delete",
    url,
    headers: {Authorization: `Bearer ${token}`},
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response.status === 401) {
        Router.push("/login");
      }
      if (error.response?.data?.error?.message) {
        alert(error.response.data.error.message);
      }
    });
}
