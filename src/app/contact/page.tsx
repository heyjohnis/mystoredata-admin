import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';

export const isAuth = async () => {
    const token = cookie.get("token");
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;
    jwt.verify(token, secretKey, async (error, decoded) => {
        console.log(error);
        console.log(decoded);
    });
  };