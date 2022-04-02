import { PostCategory, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import geocode, { LatLngLiteral } from 'utils/geocode'
import { withSessionRoute } from 'utils/session'

const DEFAULT_COUNTRY = 'Germany'

interface RequestAdmin extends NextApiRequest {
  body: {
    approved: boolean
  }
}

async function handleUpdatePostAdmin(req: RequestAdmin, res: NextApiResponse) {
  await prisma.post.update({
    data: {
      updatedAt: new Date(),
      approved: req.body.approved,
    },
    where: {
      id: req.query.id as string,
    },
  })
  res.status(200).end()
}

interface Request extends NextApiRequest {
  body: {
    title: string
    description: string
    category: PostCategory[]
    website: string
    phoneNumber: string
    addressStreet: string
    addressHouseNumber: string
    addressZip: string
    addressCity: string
  }
}

async function handleUpdatePost(req: Request, res: NextApiResponse) {
  const post = await prisma.post.findFirst({
    where: {
      id: req.query.id as string,
      author: {
        id: req.session.user?.id,
      },
    },
  })
  if (post == null) {
    res.status(400).end()
    return
  }

  let latLng: LatLngLiteral | null = null
  if (req.body.addressCity != '') {
    latLng = await geocode(req.body.addressCity, DEFAULT_COUNTRY)
  }

  await prisma.post.update({
    data: {
      updatedAt: new Date(),
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      website: req.body.website,
      phoneNumber: req.body.phoneNumber,
      addressStreet: req.body.addressStreet,
      addressHouseNumber: req.body.addressHouseNumber,
      addressZip: req.body.addressZip,
      addressCity: req.body.addressCity,
      addressCityLat: latLng?.lat,
      addressCityLng: latLng?.lng,
    },
    where: {
      id: req.query.id as string,
    },
  })
  res.status(200).end()
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user == undefined) {
    res.status(401).end()
    return
  }
  if (req.method === 'PUT') {
    if (req.session.user.role == UserRole.ADMIN) {
      await handleUpdatePostAdmin(req, res)
    } else {
      await handleUpdatePost(req, res)
    }
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
