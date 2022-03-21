import { Container, Stack, StackDivider, useColorModeValue } from '@chakra-ui/react'
import SectionCovid from 'components/welcome/section-covid'
import SectionFirstSteps from 'components/welcome/section-firststeps'
import SectionNecessities from 'components/welcome/section-necessities'
import SectionOther from 'components/welcome/section-other'
import SectionPlaces from 'components/welcome/section-places'
import SectionTranslations from 'components/welcome/section-translation'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'
import Overview from '../components/welcome'

type Props = {
  user?: MappedUser
}

const WelcomePage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Stack
          spacing={20}
          divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}
        >
          <Overview />
          <SectionFirstSteps />
          <SectionPlaces />
          <SectionTranslations />
          <SectionNecessities />
          <SectionCovid />
          <SectionOther />
        </Stack>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default WelcomePage
