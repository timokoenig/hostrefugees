import { Container } from '@chakra-ui/react'
import LanguageOnboarding from 'components/onboarding/language'
import VerificationOnboarding from 'components/onboarding/verification'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

const ONBOARDING_LANGUAGE = 'LANGUAGE'
const ONBOARDING_VERIFICATION = 'VERIFICATION'

type Props = {
  user: MappedUser
  steps: string[]
}

const OnboardingPage = (props: Props) => {
  const router = useRouter()
  const [steps, setSteps] = useState<string[]>(props.steps)

  const onNext = async () => {
    if (steps.length === 1) {
      // TODO redirect user to request page if needed
      await router.replace('/dashboard')
      return
    }
    setSteps(steps.filter(step => step !== steps[0]))
  }

  return (
    <Layout user={props.user}>
      <Container maxW="7xl" textAlign="center" maxWidth="700">
        {steps[0] === ONBOARDING_LANGUAGE && <LanguageOnboarding onNext={onNext} />}
        {steps[0] === ONBOARDING_VERIFICATION && <VerificationOnboarding onNext={onNext} />}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }

  const steps: string[] = [ONBOARDING_LANGUAGE, ONBOARDING_VERIFICATION]

  // TODO check onboarding steps

  if (steps.length === 0) {
    // TODO redirect user to request page if needed
    return {
      redirect: {
        destination: `/dashboard`,
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
