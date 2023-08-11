import axios from 'axios';
import cookie from 'js-cookie';

export async function POST (uri: string, data: any) {

    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8089';
    const token = cookie.get("token");
    const url = `${serverURL}${uri}`;
    console.log(url);
    return axios({
        method: "post",
        url,
        headers: { Authorization: `Bearer ${token}` },
        data,
      });
}

export async function GET (uri: string, data: any) {

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8089';
  const token = cookie.get("token");
  const url = `${serverURL}${uri}`;
  return axios({
      method: "get",
      url,
      headers: { Authorization: `Bearer ${token}` },
    });
}
