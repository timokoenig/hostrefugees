import { IronSession } from 'iron-session'
import prisma from 'prisma/client'
import { MappedUser } from 'utils/models'
import { mapUser } from './mapper'

export const getOptionalSessionUser = async (session: IronSession): Promise<MappedUser | null> => {
  if (session.user == null) return null
  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  })
  if (user == null) return null
  return mapUser(user)
}

export const getSessionUser = async (session: IronSession): Promise<MappedUser> => {
  if (session.user == null) throw new Error('User not set')
  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  })
  if (user == null) throw new Error('User not found')
  return mapUser(user)
}
