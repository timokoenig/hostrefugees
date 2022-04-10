/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as AWS from 'aws-sdk'
import { deleteCacheFile, listCacheFiles, readCacheFile, uploadCacheFile } from './s3-cache'

/**
 * Helper functions to interact with S3 buckets
 *
 * For local development environment we do not have S3 available;
 * therefore we use a local cache implementation that saves everything in a temp directory
 */

const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_ACCESS_SECRET,
})

export const S3_BUCKET_DOCUMENT = process.env.AWS_S3_BUCKET_DOCUMENT as string
export const S3_BUCKET_PLACE = process.env.AWS_S3_BUCKET_PLACE as string
export const S3_BUCKET_USER = process.env.AWS_S3_BUCKET_USER as string

export const uploadFile = async (
  key: string,
  file: Buffer,
  contentType: string | null,
  bucket: string
): Promise<void> => {
  if (process.env.NODE_ENV === 'development') {
    return uploadCacheFile(key, file, bucket)
  }

  await s3
    .upload({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: contentType ?? undefined,
    })
    .promise()
}

export const listFiles = async (prefix: string, bucket: string): Promise<string[]> => {
  if (process.env.NODE_ENV === 'development') {
    return listCacheFiles(prefix, bucket)
  }

  const objects = await s3
    .listObjects({
      Bucket: bucket,
      Prefix: prefix,
    })
    .promise()
  return (
    (objects.Contents?.map(content => content.Key).filter(key => key !== undefined) as string[]) ??
    []
  )
}

export const readFile = async (
  key: string,
  bucket: string
): Promise<{ data: Buffer; contentType: string }> => {
  if (process.env.NODE_ENV === 'development') {
    return readCacheFile(key, bucket)
  }

  const data = await s3
    .getObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()
  if (data.Body === undefined) {
    throw new Error('Object body undefined')
  }
  return {
    data: Buffer.from(data.Body.valueOf() as string),
    contentType: data.ContentType ?? '',
  }
}

export const deleteFile = async (key: string, bucket: string): Promise<void> => {
  if (process.env.NODE_ENV === 'development') {
    return deleteCacheFile(key, bucket)
  }

  await s3
    .deleteObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()
}
