/* eslint-disable no-empty */
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { mapPlace } from 'utils/mapper'
import { withSessionRoute } from 'utils/session'
import translate from 'utils/translate'

async function handlePlaceTranslation(req: NextApiRequest, res: NextApiResponse) {
  const place = await prisma.place.findFirst({
    where: {
      id: req.query.id as string,
      active: true,
      approved: true,
    },
    include: {
      author: true,
    },
  })
  if (place === null) {
    res.status(400).end()
    return
  }

  const mappedPlace = mapPlace(place)

  try {
    const titleTrans = await translate(mappedPlace.title, 'uk')
    mappedPlace.title = titleTrans.translatedText
  } catch {}

  try {
    const descriptionTrans = await translate(mappedPlace.description, 'uk')
    mappedPlace.description = descriptionTrans.translatedText
  } catch {}

  try {
    const houseRulesTrans = await translate(mappedPlace.houseRules, 'uk')
    mappedPlace.houseRules = houseRulesTrans.translatedText
  } catch {}

  res.status(200).send(mappedPlace)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await handlePlaceTranslation(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
