import { UserRole } from '@prisma/client'
import prisma from 'prisma/client'

export const ONBOARDING_LANGUAGE = 'LANGUAGE'
export const ONBOARDING_VERIFICATION = 'VERIFICATION'
export const ONBOARDING_PROFILE_PHOTO = 'PROFILE_PHOTO'

// Checks if a user needs to do the onboarding and returns all steps that he needs to go through
export const onboardingCheck = async (userId: string): Promise<string[]> => {
  const steps: string[] = []

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (user == null) return [] // skip onboarding because user doesn't even exist

  // Check if user has at least one language selected
  if (user.languages.length === 0) {
    steps.push(ONBOARDING_LANGUAGE)
  }

  // Check if host needs to submit documents for the verification
  if (user.role == UserRole.HOST && user.verificationSubmittedAt == null) {
    steps.push(ONBOARDING_VERIFICATION)
  }

  // Check if user should to submit a photo
  if (user.photoUpdatedAt == null) {
    steps.push(ONBOARDING_PROFILE_PHOTO)
  }

  return steps
}
