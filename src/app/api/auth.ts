import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';
import { NextResponse
 } from 'next/server';
 import { redirect } from 'next/navigation'

export const isAuth = async () => {
    jwt.verify(cookie.get("token") || '', process.env.NEXT_PUBLIC_JWT_SECRET || '', async (error, decoded) => {
        if(error) return false
        if(decoded) return true
    });
  };