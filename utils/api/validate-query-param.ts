import type { NextApiRequest } from 'next'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import * as Yup from 'yup'

export const validateUUIDQueryParam = async (
  req: NextApiRequest,
  name: string
): Promise<string> => {
  const param = req.query[name] as string | undefined
  if (param == undefined)
    throw new HttpError(`Query param ${name} not set`, HTTP_STATUS_CODE.BAD_REQUEST)
  return Yup.string().uuid().required().validate(param)
}
