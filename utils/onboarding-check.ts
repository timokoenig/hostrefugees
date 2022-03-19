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

  // TODO implement the verification logic only for HOSTS
  // ONBOARDING_VERIFICATION
  // steps.push(ONBOARDING_VERIFICATION)

  // TODO implement logic
  // steps.push(ONBOARDING_PROFILE_PHOTO)

  return steps
}
