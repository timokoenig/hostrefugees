import fs from 'fs'
import os from 'os'

const CACHE_DIR = 'hostrefugees-storage'
const CACHE_PATH = `${os.tmpdir()}/${CACHE_DIR}`

const bucketPath = (bucket: string): string => `${CACHE_PATH}/${bucket}`
const filePath = (bucket: string, key: string): string =>
  `${bucketPath(bucket)}/${key.replace('/', '-')}`

const createBucketIfNeeded = async (bucket: string): Promise<void> => {
  if (!fs.existsSync(CACHE_PATH)) {
    fs.mkdirSync(CACHE_PATH)
  }
  if (!fs.existsSync(bucketPath(bucket))) {
    fs.mkdirSync(bucketPath(bucket))
  }
}

export const uploadCacheFile = async (key: string, file: Buffer, bucket: string): Promise<void> => {
  console.log('S3 Cache - uploadCacheFile')
  await createBucketIfNeeded(bucket)
  fs.writeFileSync(filePath(bucket, key), file)
}

export const listCacheFiles = async (prefix: string, bucket: string): Promise<string[]> => {
  console.log('S3 Cache - listCacheFiles')
  await createBucketIfNeeded(bucket)
  const files = fs.readdirSync(bucketPath(bucket))
  return files.filter(file => file.startsWith(prefix))
}

export const readCacheFile = async (
  key: string,
  bucket: string
): Promise<{ data: Buffer; contentType: string }> => {
  console.log('S3 Cache - readCacheFile')
  if (!fs.existsSync(filePath(bucket, key))) throw new Error('Cache file not found')
  const data = fs.readFileSync(filePath(bucket, key))
  return { data, contentType: '' }
}

export const deleteCacheFile = async (key: string, bucket: string): Promise<void> => {
  console.log('S3 Cache - deleteCacheFile')
  if (fs.existsSync(filePath(bucket, key))) {
    fs.unlinkSync(filePath(bucket, key))
  }
}
