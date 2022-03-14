import { Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const Layout = (props: Props) => (
  <Flex flexDirection="column" minHeight="100vh">
    {props.children}
  </Flex>
)

export default Layout
