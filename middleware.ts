import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('mao.access-token')?.value
  const refreshToken = request.cookies.get('mao.refresh-token')?.value
  
}


// Todo: keep only bypass and onboarding or matcher
export const config = {
  matcher: [
    /*
        Match all routes except:
        - /login
        - /register
      */
    '/((?!login|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|icons).*)'
  ]
}
