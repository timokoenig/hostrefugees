/* eslint-disable import/order */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UserRole } from '@prisma/client'
import { hash } from 'bcrypt'
import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import {
  newAuthenticatedHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import { deleteFile, S3_BUCKET_DOCUMENT, S3_BUCKET_PLACE, S3_BUCKET_USER } from 'utils/aws/s3'
import { deleteCacheFile } from 'utils/aws/s3-cache'
import { emailApprovedUser, sendEmail } from 'utils/email'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface UpdateRequest extends NextApiRequest {
  body: {
    verified?: boolean
    languages?: string[]
    waitlist?: boolean
  }
}

const validationSchema = Yup.object()
  .shape({
    verified: Yup.boolean(),
    languages: Yup.mixed<string[]>(),
    waitlist: Yup.boolean(),
  })
  .noUnknown()

async function handleUpdateUser(req: UpdateRequest, res: NextApiResponse) {
  const userId = await validateUUIDQueryParam(req, 'id')
  const body = await validationSchema.validate(req.body)

  if (userId !== req.session.user!.id && req.session.user!.role !== UserRole.ADMIN) {
    // Users can only edit their own profile, except users with role ADMIN
    res.status(400).end()
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (user === null) {
    res.status(400).end()
    return
  }

  const data: {
    updatedAt: Date
    verified?: boolean
    languages?: string[]
    waitlist?: boolean
  } = {
    updatedAt: new Date(),
  }
  if (body.languages !== undefined) {
    data.languages = body.languages
  }
  if (body.waitlist !== undefined) {
    data.waitlist = body.waitlist
  }

  if (req.session.user!.role == UserRole.ADMIN) {
    if (body.verified !== undefined) {
      data.verified = body.verified
    }
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  })

  if (
    req.session.user!.role === UserRole.ADMIN &&
    user.verified !== body.verified &&
    body.verified
  ) {
    await sendEmail(emailApprovedUser(user))
  }

  res.status(200).end()
}

async function handleDeleteUser(req: UpdateRequest, res: NextApiResponse) {
  const userId = await validateUUIDQueryParam(req, 'id')

  if (userId != req.session.user?.id)
    throw new HttpError('Not allowed to delete another user', HTTP_STATUS_CODE.FORBIDDEN)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (user == null || user.role == UserRole.ADMIN || user.deleted)
    throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  // Delete all personal user data but keep anonymized references to place requests
  // - Delete users posts
  await prisma.post.deleteMany({
    where: {
      author: {
        id: userId,
      },
    },
  })

  // - Delete users place photos
  const allPlaces = await prisma.place.findMany({
    where: {
      author: {
        id: userId,
      },
    },
  })
  for (let i = 0; i < allPlaces.length; i++) {
    for (let j = 0; j < allPlaces[i].photos.length; j++) {
      const placeFile = `${allPlaces[i].id}/${allPlaces[i].photos[j]}`
      await deleteFile(placeFile, S3_BUCKET_PLACE)
      await deleteCacheFile(userId, S3_BUCKET_PLACE)
    }
  }

  // - Delete users personal data from requests
  await prisma.request.updateMany({
    where: {
      author: {
        id: userId,
      },
    },
    data: {
      about: '',
      aboutTranslation: {
        sourceLanguage: '',
        translations: [],
      },
      phoneNumber: '',
    },
  })

  // - Delete users personal data from places and mark them as deleted
  await prisma.place.updateMany({
    where: {
      author: {
        id: userId,
      },
    },
    data: {
      deleted: true,
      title: 'Deleted Place',
      titleTranslation: {
        sourceLanguage: '',
        translations: [],
      },
      description: '',
      descriptionTranslation: {
        sourceLanguage: '',
        translations: [],
      },
      addressStreet: '',
      addressHouseNumber: '',
      addressZip: '',
      phoneNumber: '',
      arrivalInstructions: '',
      arrivalInstructionsTranslation: {
        sourceLanguage: '',
        translations: [],
      },
      houseRules: '',
      houseRulesTranslation: {
        sourceLanguage: '',
        translations: [],
      },
    },
  })

  // - Delete users profile photo
  await deleteFile(userId, S3_BUCKET_USER)
  await deleteCacheFile(userId, S3_BUCKET_USER)

  // - Delete users documents
  const types = ['front', 'back', 'selfie']
  for (let i = 0; i < types.length; i++) {
    const documentFile = `${userId}/${types[i]}`
    await deleteFile(documentFile, S3_BUCKET_DOCUMENT)
  }

  // - Delete users personal data from profile and mark it as deleted
  const randomHash = crypto.randomBytes(64).toString('hex')
  const hashedPassword = await hash(randomHash, 14)
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      deletedAt: new Date(),
      firstname: 'John',
      lastname: 'Doe',
      email: `${userId}@hostrefugees.eu`,
      password: hashedPassword,
      passwordResetAt: null,
      passwordResetHash: null,
      photoUpdatedAt: null,
      deleted: true,
    },
  })

  // - Destroy users session
  req.session.destroy()

  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newAuthenticatedHandler(HTTP_METHOD.PUT, [], handleUpdateUser),
        newAuthenticatedHandler(HTTP_METHOD.DELETE, [], handleDeleteUser),
      ])
    )
  )
)
