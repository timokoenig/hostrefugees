/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as AWS from 'aws-sdk'

const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_ACCESS_SECRET,
})

export const S3_BUCKET_DOCUMENTS = process.env.AWS_S3_BUCKET_DOCUMENTS as string
export const S3_BUCKET_PLACE = process.env.AWS_S3_BUCKET_PLACE as string
export const S3_BUCKET_USER = process.env.AWS_S3_BUCKET_USER as string

export const uploadFile = async (
  key: string,
  file: Buffer,
  contentType: string | null,
  bucket: string
): Promise<void> => {
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
  await s3
    .deleteObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()
}
