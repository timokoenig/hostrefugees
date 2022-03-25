import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { MappedUser } from '../utils/models'
import Navigation from './navigation'
import Spacer from './spacer'

const Footer = dynamic(() => import('./footer'), {
  ssr: false,
})

type Props = {
  user?: MappedUser
  children: JSX.Element | JSX.Element[]
}

const Layout = (props: Props) => (
  <Flex flexDirection="column" minHeight="100vh">
    <Navigation user={props.user} />
    {props.children}
    <Spacer />
    <Footer />
  </Flex>
)

export default Layout
