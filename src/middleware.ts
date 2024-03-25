import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  //define our public path url   
  const isPublicPath = path === "/userauth/login" || path === "/userauth/signup" || path === "/userauth/forgotpassword" || path === "/userauth/resetpassword";
  //getting token from cookies using request   
  const token = request.cookies.get('token')?.value || "";

  //we will check if token is  present and user try to access login and signup then redirect to profile
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  //we will check if user is not login and he also try go to profile page then redirect him in login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/userauth/login", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile",
    "/userauth/login",
    "/userauth/signup",
    "/userauth/forgotpassword",
    "/userauth/resetpassword",
    "/userauth/mailconfirmation",
    "/userauth/verify",
  ]
}