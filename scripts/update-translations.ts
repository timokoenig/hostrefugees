/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-await-in-loop */
import prisma from '../prisma/client'
import translateAll from '../utils/translate-all'

//
// Update translations of all posts, places, requests
// Use this script when you add a new language to `translate-all.ts`
//

const updatePosts = async () => {
  console.log('Posts')
  const posts = await prisma.post.findMany({})

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    console.log(post.id)
    const titleTranslation = await translateAll(post.title)
    const descriptionTranslation = await translateAll(post.description)

    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        titleTranslation,
        descriptionTranslation,
      },
    })
  }
}

const updatePlaces = async () => {
  console.log('Places')
  const places = await prisma.place.findMany({})

  for (let i = 0; i < places.length; i++) {
    const place = places[i]
    console.log(place.id)
    const titleTranslation = await translateAll(place.title)
    const descriptionTranslation = await translateAll(place.description)
    const arrivalInstructionsTranslation = await translateAll(place.arrivalInstructions)
    const houseRulesTranslation = await translateAll(place.houseRules)

    await prisma.place.update({
      where: {
        id: place.id,
      },
      data: {
        titleTranslation,
        descriptionTranslation,
        arrivalInstructionsTranslation,
        houseRulesTranslation,
      },
    })
  }
}

const updateRequests = async () => {
  console.log('Requests')
  const requests = await prisma.request.findMany({})

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i]
    console.log(request.id)
    const aboutTranslation = await translateAll(request.about)

    await prisma.request.update({
      where: {
        id: request.id,
      },
      data: {
        aboutTranslation,
      },
    })
  }
}

updatePosts().then(updatePlaces).then(updateRequests).catch(console.log)
