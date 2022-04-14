/* eslint-disable no-await-in-loop */
import { UserRole } from '@prisma/client'
import moment from 'moment'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import logger from 'utils/logger'
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
        logger.error({ name: err.name, status: err.status, message: err.message }, 'HttpError')
        if (err.stack != null) {
          const stack = err.stack.split('\n')
          stack.splice(0, 1)
          logger.debug({ stack })
        }
      } else {
        logger.error({ name: (err as Error).name, message: (err as Error).message }, 'Error')
      }
      res.status(400).end()
    }
  }
}

export const withLogHandler = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const time = moment()
    await handler(req, res)
    const data = {
      url: req.url,
      method: req.method,
      statusCode: res.statusCode,
      requestTime: time.toISOString(),
      responseTime: moment().toISOString(),
    }
    if (res.statusCode >= 200 && res.statusCode < 400) {
      logger.info(data)
    } else {
      logger.error(data)
    }
  }
}
