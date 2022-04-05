/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import formidable, { IncomingForm } from 'formidable'
import fs from 'fs'
import type { NextApiRequest } from 'next'
import convertHeic from 'utils/api/convert-heic'

export type PhotoFile = {
  data: Buffer
  mimetype: string
  fields: formidable.Fields
}

const parsePhotoRequest = (req: NextApiRequest): Promise<PhotoFile> => {
  return new Promise<PhotoFile>((resolve, reject) => {
    const form = new IncomingForm({
      maxFiles: 1,
      maxFileSize: 20 * 1024 * 1024,
      filter: ({ mimetype }): boolean => {
        // keep only images
        if (mimetype == null || !mimetype.includes('image')) {
          return false
        }
        return (
          mimetype.includes('jpg') ||
          mimetype.includes('jpeg') ||
          mimetype.includes('png') ||
          mimetype.includes('heic') ||
          mimetype.includes('heif')
        )
      },
    })
    form.parse(req, async (_err, fields, files) => {
      try {
        // @ts-ignore
        if (files.file == undefined) {
          throw new Error('no file')
        }
        const formFile = files.file as unknown as formidable.File
        let file = fs.readFileSync(formFile.filepath)

        if (formFile.mimetype == null) {
          throw new Error('no mimetype')
        }
        // convert heic/heif to jpg if needed
        if (formFile.mimetype.includes('heic') || formFile.mimetype.includes('heif')) {
          file = await convertHeic(file)
        }

        resolve({
          data: file,
          mimetype: formFile.mimetype,
          fields,
        })
      } catch (err: unknown) {
        reject(err)
      }
    })
  })
}

export default parsePhotoRequest
