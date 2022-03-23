/* eslint-disable import/order */
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { deleteFile, readFile, S3_BUCKET_PLACE } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'

async function handlePlacePhotoDelete(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user == undefined) {
    res.status(401).end()
    return
  }

  const place = await prisma.place.findUnique({
    where: {
      id: req.query.id as string,
    },
    include: {
      author: true,
    },
  })
  if (place === null) {
    res.status(400).end()
    return
  }
  if (place.author.id !== req.session.user.id) {
    // user can only update own places
    res.status(400).end()
    return
  }

  const photoId = req.query.photoId as string
  if (!place.photos.includes(photoId)) {
    res.status(400).end()
    return
  }

  await deleteFile(`${place.id}/${photoId}`, S3_BUCKET_PLACE)

  const newPhotos = place.photos.filter(p => p != photoId)
  await prisma.place.update({
    where: {
      id: place.id,
    },
    data: {
      updatedAt: new Date(),
      photos: newPhotos,
      approved: newPhotos.length != 0,
    },
  })

  res.status(200).end()
}

async function handleGetPlacePhoto(req: NextApiRequest, res: NextApiResponse) {
  const place = await prisma.place.findUnique({
    where: {
      id: req.query.id as string,
    },
  })
  if (place === null) {
    res.status(400).end()
    return
  }

  try {
    const image = await readFile(`${place.id}/${req.query.photoId}`, S3_BUCKET_PLACE)
    res.setHeader('Content-Type', image.contentType)
    res.send(image.data)
  } catch (err: unknown) {
    res.status(400).end()
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'GET') {
    await handleGetPlacePhoto(req, res)
    return
  }
  if (req.method === 'DELETE') {
    await handlePlacePhotoDelete(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
