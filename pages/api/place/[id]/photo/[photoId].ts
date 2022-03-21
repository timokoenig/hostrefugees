/* eslint-disable import/order */
import { Place } from '@prisma/client'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

const deleteFile = async (place: Place, photoId: string) => {
  fs.readdirSync(path.resolve('storage')).forEach(file => {
    if (file.startsWith(`${place.id}-${photoId}`)) {
      fs.unlinkSync(path.resolve(`storage/${file}`))
    }
  })
}

const getFile = (placeId: string, photoId: string): string | null => {
  const files = fs.readdirSync(path.resolve('storage'))
  for (let i = 0; i < files.length; i++) {
    if (files[i].startsWith(`${placeId}-${photoId}`)) {
      return files[i]
    }
  }
  return null
}

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

  await deleteFile(place, photoId)

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

  const file = getFile(place.id, req.query.photoId as string)
  if (file === null) {
    res.status(400).end()
    return
  }

  const filePath = path.resolve(`storage/${file}`)
  const imageBuffer = fs.readFileSync(filePath)

  res.setHeader('Content-Type', 'image/jpg')
  res.send(imageBuffer)
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
