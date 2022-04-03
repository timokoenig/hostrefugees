/* eslint-disable no-await-in-loop */
import { UserRole } from '@prisma/client'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import HttpError, { HTTP_STATUS_CODE } from './http-error'
import HTTP_METHOD from './http-method'

export type Handler = {
  method: HTTP_METHOD
  roles?: UserRole[]
  func: NextApiHandler
}

export const newHandler = (method: HTTP_METHOD, func: NextApiHandler): Handler => {
  return {
    method,
    func,
  }
}

export const newAuthenticatedHandler = (
  method: HTTP_METHOD,
  roles: UserRole[],
  func: NextApiHandler
): Handler => {
  return {
    method,
    roles,
    func,
  }
}

export const withHandlers = (handlers: Handler[]): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Run matching handlers
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i].method == req.method) {
        const roles = handlers[i].roles
        if (roles == undefined) {
          // Handler without authentication
          await handlers[i].func(req, res)
          return
        } else {
          // Handler with authentication
          if (req.session.user == undefined) {
            throw new HttpError('Unauthorized', HTTP_STATUS_CODE.UNAUTHORIZED)
          }
          if (roles.length == 0 || roles.includes(req.session.user.role)) {
            await handlers[i].func(req, res)
            return
          }
        }
      }
    }

    // Throw error if no handler matches
    throw new HttpError(
      `Method not supported; got ${req.method}`,
      HTTP_STATUS_CODE.METHOD_NOT_ALLOWED
    )
  }
}

export const withErrorHandler = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        console.log(`${err.name}: ${err.status}; ${err.message}`)
        if (err.stack != null) {
          const stack = err.stack.split('\n')
          stack.splice(0, 1)
          console.log(stack.join('\n'))
        }
      } else {
        console.log(err)
      }
      res.status(400).end()
    }
  }
}
