import { Container } from '@chakra-ui/react'
import LanguageOnboarding from 'components/onboarding/language'
import ProfilePhotoOnboarding from 'components/onboarding/profilephoto'
import VerificationOnboarding from 'components/onboarding/verification'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MappedUser } from 'utils/models'
import {
  onboardingCheck,
  ONBOARDING_LANGUAGE,
  ONBOARDING_PROFILE_PHOTO,
  ONBOARDING_VERIFICATION,
} from 'utils/onboarding-check'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user: MappedUser
  steps: string[]
}

const OnboardingPage = (props: Props) => {
  const router = useRouter()
  const [steps, setSteps] = useState<string[]>(props.steps)

  const onNext = async () => {
    if (steps.length === 1) {
      if (router.query.place === undefined) {
        await router.replace('/dashboard')
      } else {
        await router.replace(`/place/${router.query.place}/request`)
      }
      return
    }
    setSteps(steps.filter(step => step !== steps[0]))
  }

  return (
    <Layout user={props.user}>
      <Container maxW="7xl" textAlign="center" maxWidth="700">
        {steps[0] === ONBOARDING_LANGUAGE && (
          <LanguageOnboarding user={props.user} onNext={onNext} />
        )}
        {steps[0] === ONBOARDING_VERIFICATION && (
          <VerificationOnboarding user={props.user} onNext={onNext} />
        )}
        {steps[0] === ONBOARDING_PROFILE_PHOTO && (
          <ProfilePhotoOnboarding user={props.user} onNext={onNext} />
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }

  // Check if user really needs to do the onboarding
  const steps = await onboardingCheck(context.req.session.user.id)
  if (steps.length === 0) {
    return {
      redirect: {
        destination:
          context.query.place === undefined
            ? `/dashboard`
            : `/place/${context.query.place}/request`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: context.req.session.user,
      steps,
    },
  }
})

export default OnboardingPage
