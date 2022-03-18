import { BathroomType, PlaceType, PrismaClient, UserRole } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const adminPwd = await hash('admin', 10)
  await prisma.user.create({
    data: {
      firstname: 'Admin',
      lastname: 'Foo',
      email: 'admin@hostrefugees.eu',
      password: adminPwd,
      role: UserRole.ADMIN,
      languages: ['en'],
    },
  })

  const hostPwd = await hash('host', 10)
  const host = await prisma.user.create({
    data: {
      firstname: 'Host',
      lastname: 'Foo',
      email: 'host@hostrefugees.eu',
      password: hostPwd,
      role: UserRole.HOST,
      languages: ['en', 'de'],
    },
  })

  await prisma.place.create({
    data: {
      userId: host.id,
      approved: true,
      active: true,
      title: '4 Large Room',
      description: 'This room has been empty for a long time',
      type: PlaceType.PRIVATE,
      rooms: 4,
      beds: 9,
      bathroom: BathroomType.YES,
      adults: 7,
      children: 2,
      addressStreet: 'Willy-Brandt-Straße',
      addressHouseNumber: '1',
      addressZip: '10557',
      addressCity: 'Berlin',
      addressCityLat: '52.520008',
      addressCityLng: '13.404954',
      addressCountry: 'Germany',
      houseRules:
        'Keep it clean and let me know when you need something. We are happy to host you.',
      availabilityStart: new Date(),
    },
  })

  await prisma.place.create({
    data: {
      userId: host.id,
      approved: true,
      active: true,
      title: 'Shared Room',
      description: 'We have a big studio apartment with two empty beds where you can stay with us',
      type: PlaceType.PRIVATE,
      rooms: 1,
      beds: 3,
      bathroom: BathroomType.YES,
      adults: 2,
      children: 1,
      addressStreet: 'Willy-Brandt-Straße',
      addressHouseNumber: '1',
      addressZip: '10557',
      addressCity: 'Berlin',
      addressCityLat: '52.520008',
      addressCityLng: '13.404954',
      addressCountry: 'Germany',
      houseRules:
        'Keep it clean and let me know when you need something. We are happy to host you.',
      availabilityStart: new Date(),
    },
  })

  const place = await prisma.place.create({
    data: {
      userId: host.id,
      approved: true,
      active: true,
      title: '1BR Apartment',
      description: 'Lovely apartment on the 3rd floor',
      type: PlaceType.PLACE,
      rooms: 1,
      beds: 1,
      bathroom: BathroomType.YES,
      adults: 1,
      children: 0,
      addressStreet: 'Jungfernstieg',
      addressHouseNumber: '1',
      addressZip: '20095',
      addressCity: 'Hamburg',
      addressCityLat: '53.551086',
      addressCityLng: '9.993682',
      addressCountry: 'Germany',
      houseRules: 'Please take off your shoes when you go in the apartment',
      availabilityStart: new Date(),
    },
  })

  const guestPwd = await hash('guest', 10)
  const guest = await prisma.user.create({
    data: {
      firstname: 'Guest',
      lastname: 'Foo',
      email: 'guest@hostrefugees.eu',
      password: guestPwd,
      role: UserRole.GUEST,
      languages: ['en', 'de'],
    },
  })

  await prisma.request.create({
    data: {
      userId: guest.id,
      placeId: place.id,
      adults: 1,
      children: 0,
      startDate: new Date(),
      about: 'My name is Guest Foo and I am a very clean person',
    },
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
