/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

let prisma: PrismaClient

if (typeof window === 'undefined' && process.env.NEXTJS_BUILD == undefined) {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }

    prisma = global.prisma
  }
}

// @ts-ignore
export default prisma
