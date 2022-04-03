import { NextRequest, NextResponse } from 'next/server'
import cors from 'utils/api/cors'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  return cors(req, res)
}
