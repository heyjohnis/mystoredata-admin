import axios from 'axios';
import cookie from 'js-cookie';

export async function post (uri: string, data: any) {

    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
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
