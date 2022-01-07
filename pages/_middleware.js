import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
    //TOKEN WILL EXIST IF USER IS LOGGED IN
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    //REDIRECT TO HOME PAGE IF TOKEN EXISTS AND ARE REQUESTING LOGIN PAGE 
    if (token && pathname === "/login") {
        return NextResponse.redirect("/");
    }

    //ALLOW TO PASS THROUGH IF true
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    //REDIRECT THEM TO LOGIN IF THEY DONT HAVE TOKEN AND ARE REQUESTING A PROTECTED ROUTE
    // if (!token && pathname !== "/login") {
    //     return NextResponse.redirect("/login");
    // }
}
