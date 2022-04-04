/* eslint-disable @typescript-eslint/no-unsafe-call */
import convert from 'heic-convert'

const convertHeic = (buf: Buffer): Promise<Buffer> => {
  return convert({
    buffer: buf,
    format: 'JPEG',
    quality: 1,
  })
}

export default convertHeic
