/* eslint-disable no-await-in-loop */
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import compress from 'utils/api/compress'
import { readFile } from 'utils/aws/s3'
import { deleteCacheFile, listCacheFiles, readCacheFile, uploadCacheFile } from 'utils/aws/s3-cache'

const MAX_SIZE = 5000
const CACHE_BUCKET = 'image-cache'

export const deleteCachedImages = async (file: string): Promise<void> => {
  const files = await listCacheFiles(file.replace('/', '-'), CACHE_BUCKET)
  for (let i = 0; i < files.length; i++) {
    await deleteCacheFile(files[i], CACHE_BUCKET)
  }
}

const getRequestedSize = (req: NextApiRequest): { width: number | null; height: number | null } => {
  const reqWidth = parseInt(req.query.width as string, 10)
  const reqHeight = parseInt(req.query.height as string, 10)

  let width: number | null = isNaN(reqWidth) ? null : reqWidth
  if ((width ?? 0) <= 0) {
    width = null
  }
  if ((width ?? 0) > MAX_SIZE) {
    width = MAX_SIZE
  }

  let height: number | null = isNaN(reqHeight) ? null : reqHeight
  if ((height ?? 0) <= 0) {
    height = null
  }
  if ((height ?? 0) > MAX_SIZE) {
    height = MAX_SIZE
  }
  return { width, height }
}

const handleImageRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  file: string,
  bucket: string
): Promise<void> => {
  const size = getRequestedSize(req)
  const cacheFilename = [
    file.replace('/', '-'),
    `w${size.width ?? ''}`,
    `h${size.height ?? ''}`,
  ].join('-')

  let image: { data: Buffer; contentType: string } | null = null

  try {
    // Check if file is already cached
    image = await readCacheFile(cacheFilename, CACHE_BUCKET)
  } catch {
    // if not, try to load from S3 bucket
    image = await readFile(file, bucket)

    // resize image and save it as webp in cache
    const resizedImage = await sharp(image.data)
      .resize(size.width, size.height)
      .toFormat(sharp.format.webp)
      .toBuffer()

    await uploadCacheFile(cacheFilename, resizedImage, CACHE_BUCKET)

    image.data = resizedImage
  }

  // compress image and send it to the client
  const acceptEncoding = req.headers['accept-encoding']
    ? (req.headers['accept-encoding'] as string)
    : ''
  const compressedImage = await compress(acceptEncoding, image.data)
  res.setHeader('Content-Type', 'image/webp')
  res.setHeader('Content-Encoding', compressedImage.encoding)
  res.setHeader('Expires', moment().add(1, 'day').toDate().toUTCString())
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.send(compressedImage.data)
}

export default handleImageRequest
