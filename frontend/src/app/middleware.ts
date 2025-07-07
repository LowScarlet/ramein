import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function AuthMiddleware(request: NextRequest) {
  // const url = request.nextUrl

  // const accessToken = request.cookies.get('accessToken');
  // const refreshToken = request.cookies.get('refreshToken');

  // if (accessToken?.value || refreshToken?.value) {
  //   return NextResponse.redirect(new URL('/home', request.url))
  // }

  // if (url.pathname === '/auth') {
  //   return NextResponse.redirect(new URL('/auth/login', request.url))
  // }

  return NextResponse.next();
}